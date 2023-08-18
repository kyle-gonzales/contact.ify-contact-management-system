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

    public void Add(ContactAudit audit)
    {
        _context.ContactAuditTrail.Add(audit);
    }
}