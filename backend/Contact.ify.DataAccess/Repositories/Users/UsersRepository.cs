using Contact.ify.DataAccess.Data;
using Contact.ify.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace Contact.ify.DataAccess.Repositories.Users;

public class UsersRepository : IUsersRepository
{
    private readonly ContactsContext _context;

    public UsersRepository(ContactsContext context)
    {
        _context = context;
    }
    
    public void Add(User user)
    {
        _context.Users.Add(user);
    }

    public async Task<ICollection<User>> GetAllAsync()
    {
        return await _context.Users.ToListAsync();
    }
    
    public async Task<bool> IsUserNameUniqueAsync(string userName)
    {
        return await _context.Users.CountAsync(user => user.UserId == userName) == 0;
    }

    public async Task<bool> UserExistsAsync(string userName)
    {
        return await _context.Users.AnyAsync(user => user.UserId == userName);
    }

    public async Task<User?> GetAsync(string id)
    {
        return await _context.Users.FindAsync(id);
    }
}