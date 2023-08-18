using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Contact.ify.DataAccess.Entities;

public class ContactEmail
{
    public int ContactEmailId { get; set; }

    [Required] [ForeignKey("ContactId")] public Contact Contact { get; set; } = null!;
    
    [EmailAddress]
    [MinLength(4)]
    [MaxLength(255)]
    public string Email { get; set; }

    [Required] public bool IsDeleted { get; set; }

    public ContactEmail(string email)
    {
        Email = email;
    }
}