using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Contact.ify.DataAccess.Entities;
using Contact.ify.DataAccess.UnitOfWork;
using Contact.ify.Domain.DTOs;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Contact.ify.Domain.Services;

public class UsersService : IUsersService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public UsersService(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration configuration)
    {
        _unitOfWork= unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    public async Task<bool> RegisterUserAsync(RegisterUserRequest request)
    {
        if (!await _unitOfWork.Users.IsUserNameUniqueAsync(request.UserName))
        {
            return false;
        }
        var user = _mapper.Map<User>(request); // should i check if user is null?
        
        _unitOfWork.Users.Add(user);
        await _unitOfWork.CompleteAsync();
        return true;
    }

    public async Task<string?> LoginUserAsync(LoginUserRequest request)
    {
        var user = await _unitOfWork.Users.GetAsync(request.UserName);
        if (user == null)
        {
            return null;
        }

        if (! IsValidPassword(request.Password, user.PasswordHash))
        {
            return null;
        }

        var token = CreateToken(user);
        return token;
    }

    public Task<UserResponse?> GetUserAsync(string userName)
    {
        throw new NotImplementedException();
    }
    // helper methods
    private static bool IsValidPassword(string requestPassword, string passwordHash)
    {
        return BCrypt.Net.BCrypt.Verify(requestPassword, passwordHash);
    }

    private string? CreateToken(User user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration.GetSection("Authentication:SecretKey").Value!));

        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = GenerateClaims(user);
        
        var jwtSecurityToken = new JwtSecurityToken(
            issuer: _configuration.GetSection("Authentication:Issuer").Value!,
            audience: _configuration.GetSection("Authentication:Audience").Value!,
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: signingCredentials
        );

        var token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        return token;
    }

    private static IEnumerable<Claim> GenerateClaims(User user)
    {
        var claims = new List<Claim>
        {
            new (ClaimTypes.NameIdentifier, user.UserId)
        };
        
        if (user.FirstName != null)
            claims.Add(new Claim(ClaimTypes.GivenName, user.FirstName));
        
        if (user.LastName != null)
            claims.Add(new Claim(ClaimTypes.Surname, user.LastName));
        
        if (user.Email != null)
            claims.Add(new Claim(ClaimTypes.Email, user.Email));

        return claims;
    }
}