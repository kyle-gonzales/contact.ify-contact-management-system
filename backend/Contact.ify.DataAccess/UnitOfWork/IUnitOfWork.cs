using Contact.ify.DataAccess.Repositories.Users;

namespace Contact.ify.DataAccess.UnitOfWork;

public interface IUnitOfWork : IDisposable
{
    IUsersRepository Users { get; }
    Task CompleteAsync();
}