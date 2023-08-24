using Contact.ify.Domain.DTOs.Users;

namespace Contact.ify.Domain.Services.Users;

public interface IUsersService
{
    Task<bool> RegisterUserAsync(RegisterUserRequest request);
    Task<string?> LoginUserAsync(LoginUserRequest request);
    Task<UserResponse?> GetUserAsync(string userName);
    Task<bool> UpdateUserAsync(string userName, UpdateUserRequest request);
    // Task<bool> UpdatePasswordForUserAsync();
    // Task<bool> DeleteUser(string userName);
}