using Contact.ify.DataAccess.Data;
using Contact.ify.DataAccess.Entities;

namespace Contact.ify.DataAccess.Repositories.ContactAuditTrail;

public class ContactAuditTrailRepository : IContactAuditTrailRepository
{
    private readonly ContactsContext _context;

    public ContactAuditTrailRepository(ContactsContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public void Add(int contactId,
        string modifiedBy,
        ModificationType modificationType,
        PropertyUpdated? propertyUpdated = null)
    {
        var audit = new ContactAudit(
            contactId,
            modifiedBy,
            modificationType,
            propertyUpdated
        );
        _context.ContactAuditTrail.Add(audit);
    }
}