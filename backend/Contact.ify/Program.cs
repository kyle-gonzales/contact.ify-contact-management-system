using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;
using Contact.ify.DataAccess.Data;
using Contact.ify.DataAccess.UnitOfWork;
using Contact.ify.Domain.Services.Addresses;
using Contact.ify.Domain.Services.Contacts;
using Contact.ify.Domain.Services.Emails;
using Contact.ify.Domain.Services.PhoneNumbers;
using Contact.ify.Domain.Services.Users;
using Hellang.Middleware.ProblemDetails;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddProblemDetails(options =>
    options.IncludeExceptionDetails = (_, _) => false
);
builder.Services.AddControllers()
    .AddJsonOptions(option => option.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(setup =>
    {
        var xmlCommentsFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlCommentsFullPath = Path.Combine(AppContext.BaseDirectory, xmlCommentsFile);
        setup.IncludeXmlComments(xmlCommentsFullPath);

        setup.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "Contact.ify API",
            Description = "An ASP.NET Core Web API for managing contact information",
            Version = "v1"
        });

        setup.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Paste a valid token below to use this API",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = "Bearer"
        });

        setup.AddSecurityRequirement(
            new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            }
        );
    }

);

builder.Services.AddDbContext<ContactsContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("ContactsDb"))
);
builder.Services
    .AddAuthentication("Bearer")
    .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,

                ValidIssuer = builder.Configuration.GetSection("Authentication:Issuer").Value,
                ValidAudience = builder.Configuration.GetSection("Authentication:Audience").Value,
                IssuerSigningKey =new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Authentication:SecretKey").Value!))
            };
        }
    );

builder.Services.AddCors(policy =>
    policy.AddPolicy("Contact.ifyPolicy", build =>
        {
            build.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }));

builder.Services.AddDataProtection().PersistKeysToFileSystem(new DirectoryInfo(@"C:\temp-keys\"))
                .UseCryptographicAlgorithms(new AuthenticatedEncryptorConfiguration()
                {
                    EncryptionAlgorithm = EncryptionAlgorithm.AES_256_CBC,
                    ValidationAlgorithm = ValidationAlgorithm.HMACSHA256
                });

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IContactsService, ContactsService>();
builder.Services.AddScoped<IAddressesService, AddressesService>();
builder.Services.AddScoped<IEmailsService, EmailsService>();
builder.Services.AddScoped<IPhoneNumbersService, PhoneNumbersService>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseProblemDetails();

app.UseSwagger();
app.UseSwaggerUI();

// app.UseExceptionHandler("/Error");

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("Contact.ifyPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<ContactsContext>();
    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }
}

app.Run();
