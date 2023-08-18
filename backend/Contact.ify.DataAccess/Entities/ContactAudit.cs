using System.ComponentModel.DataAnnotations;

namespace Contact.ify.DataAccess.Entities;

public class ContactAudit
{
    public int ContactAuditId { get; set; }
    
    [Required]
    public DateTimeOffset Timestamp { get; set; }
    
    [Required]
    public int ContactId { get; set; } // not a foreign key
    
    [Required]
    public int ModifiedBy { get; set; } // person who modified
    
    [Required]
    public ModificationType ModificationType { get; set; }

}

public enum ModificationType
{
    Create = 1,
    Update = 2,
    Delete = 3
}