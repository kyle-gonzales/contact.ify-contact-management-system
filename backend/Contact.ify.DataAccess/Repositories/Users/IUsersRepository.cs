using Contact.ify.DataAccess.Entities;

namespace Contact.ify.DataAccess.Repositories.Users;

public interface IUsersRepository
{
    void AddUser(User user);
    Task<User?> GetUserByUserNameAsync(string userName);
    Task<ICollection<User>> GetAllUsersAsync();
    Task<bool> IsUserNameUniqueAsync(string userName);
    Task<bool> UserExistsAsync(string userName);
    void UpdateUser(User targetUser, User updatedUser);
    void UpdatePasswordForUser(User target, string passwordHash);
    //void DeleteUser(User user);
}