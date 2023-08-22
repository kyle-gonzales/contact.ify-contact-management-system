using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

namespace Contact.ify.DataAccess.Entities;

public class ContactAudit
{
    public int ContactAuditId { get; set; }
    
    [Required]
    public DateTimeOffset Timestamp { get; set; } = DateTimeOffset.UtcNow;
    
    [Required]
    public int ContactId { get; set; } // not a foreign key
    
    [Required]
    public string ModifiedBy { get; set; } // person who modified

    public PropertyUpdated? PropertyUpdated { get; set; }
    
    [Required]
    public ModificationType ModificationType { get; set; }

    public ContactAudit(
        int contactId,
        string modifiedBy,
        ModificationType modificationType,
        PropertyUpdated? propertyUpdated = null
    )
    {
        ContactId = contactId;
        ModifiedBy = modifiedBy;
        ModificationType = modificationType;
        PropertyUpdated = propertyUpdated;
    }

}

public enum ModificationType
{
    Create = 1,
    Update = 2,
    Delete = 3
}

public enum PropertyUpdated
{
    FirstName =  1,
    LastName = 2,
    Addresses = 3,
    PhoneNumbers = 4,
    Emails = 5,
    IsFavorite = 6,
}