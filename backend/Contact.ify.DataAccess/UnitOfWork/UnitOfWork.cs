using System.Data;
using Contact.ify.DataAccess.Data;
using Contact.ify.DataAccess.Repositories.Addresses;
using Contact.ify.DataAccess.Repositories.ContactAuditTrail;
using Contact.ify.DataAccess.Repositories.Contacts;
using Contact.ify.DataAccess.Repositories.Emails;
using Contact.ify.DataAccess.Repositories.PhoneNumbers;
using Contact.ify.DataAccess.Repositories.Users;

namespace Contact.ify.DataAccess.UnitOfWork;

public class UnitOfWork : IUnitOfWork
{

    private readonly ContactsContext _context;

    public IUsersRepository Users { get; }
    public IContactsRepository Contacts { get; }
    public IPhoneNumbersRepository PhoneNumbers { get; }
    public IAddressesRepository Addresses { get; }
    public IEmailsRepository Emails { get; }
    public IContactAuditTrailRepository AuditTrail { get; }

    public UnitOfWork(ContactsContext context)
    {
        _context = context ?? throw new NoNullAllowedException(nameof(_context));
        Users = new UsersRepository(_context);

        Contacts = new ContactsRepository(_context);
        PhoneNumbers = new PhoneNumbersRepository(_context);
        Addresses = new AddressesRepository(_context);
        Emails = new EmailsRepository(_context);

        AuditTrail = new ContactAuditTrailRepository(_context);
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