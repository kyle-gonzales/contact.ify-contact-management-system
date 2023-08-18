using AutoMapper;
using Contact.ify.DataAccess.Entities;
using Contact.ify.Domain.DTOs;
using Contact.ify.Domain.DTOs.Users;

namespace Contact.ify.MappingProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<RegisterUserRequest, User>()
            .ForMember(dest => dest.PasswordHash,
                opt => opt.MapFrom( request =>
                    BCrypt.Net.BCrypt.HashPassword(request.Password) ))
            .ConstructUsing(src => 
                new User(
                    src.UserName, 
                    string.Empty, 
                    src.FirstName, 
                    src.LastName, 
                    src.Email));

        CreateMap<User, UserResponse>();
    }
}