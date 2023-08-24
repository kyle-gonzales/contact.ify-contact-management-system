using Contact.ify.DataAccess.Entities;

namespace Contact.ify.DataAccess.Repositories.ContactAuditTrail;

public interface IContactAuditTrailRepository
{
    void Add(
        int contactId,
        string modifiedBy,
        ModificationType modificationType,
        PropertyUpdated? propertyUpdated = null
    );
}