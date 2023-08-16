using Contact.ify.DataAccess.Entities;
using Contact.ify.Domain.DTOs;

namespace Contact.ify.Domain.Services;

public interface IUsersService
{
    // Task<bool> ValidatePasswordAsync(string password);
    Task<bool> RegisterUserAsync(RegisterUserRequest request);
    Task<string?> LoginUserAsync(LoginUserRequest request);
    Task<UserResponse?> GetUserAsync(string userName);
    
}