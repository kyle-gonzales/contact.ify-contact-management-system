using Contact.ify.DataAccess.Repositories.Addresses;
using Contact.ify.DataAccess.Repositories.ContactAuditTrail;
using Contact.ify.DataAccess.Repositories.Contacts;
using Contact.ify.DataAccess.Repositories.Emails;
using Contact.ify.DataAccess.Repositories.PhoneNumbers;
using Contact.ify.DataAccess.Repositories.Users;

namespace Contact.ify.DataAccess.UnitOfWork;

public interface IUnitOfWork : IDisposable
{
    IUsersRepository Users { get; }
    
    IContactsRepository Contacts { get;  }
    IPhoneNumbersRepository PhoneNumbers { get;  }
    IAddressesRepository Addresses { get;  }
    IEmailsRepository Emails { get; }
    
    IContactAuditTrailRepository AuditTrail { get; }
    
    Task CompleteAsync();
}