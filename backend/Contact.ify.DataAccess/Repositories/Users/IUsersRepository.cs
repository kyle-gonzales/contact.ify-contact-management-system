using Contact.ify.DataAccess.Entities;

namespace Contact.ify.DataAccess.Repositories.Users;

public interface IUsersRepository
{
    void Add(User user);
    Task<User?> GetAsync(string id);
    Task<ICollection<User>> GetAllAsync();
    Task<bool> IsUserNameUniqueAsync(string userName);
    Task<bool> UserExistsAsync(string userName);
}