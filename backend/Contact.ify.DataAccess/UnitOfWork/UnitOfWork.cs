using System.Data;
using Contact.ify.DataAccess.Data;
using Contact.ify.DataAccess.Repositories.Users;

namespace Contact.ify.DataAccess.UnitOfWork;

public class UnitOfWork : IUnitOfWork
{

    private readonly ContactsContext _context;

    public IUsersRepository Users { get; }
    public UnitOfWork(ContactsContext context)
    {
        _context = context ?? throw new NoNullAllowedException(nameof(_context));
        Users = new UsersRepository(_context);
    }
    
    public async Task CompleteAsync()
    {
        await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}