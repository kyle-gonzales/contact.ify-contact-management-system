using System.ComponentModel.DataAnnotations;

namespace Contact.ify.DataAccess.Entities;

public class Contact
{
    public int ContactId { get; set; }

    [Required]
    [MinLength(2)]
    [MaxLength(15)]
    public string UserId { get; set; } = null!;
    
    [MinLength(2)]
    [MaxLength(35)]
    public string? FirstName { get; set; }

    [Required]
    [MinLength(2)]
    [MaxLength(35)]
    public string LastName { get; set; } = string.Empty;

    public List<ContactAddress> Addresses { get; set; } = new();
    public List<ContactPhoneNumber> PhoneNumbers { get; set; } = new();
    public List<ContactEmail> Emails { get; set; } = new();
    
    public bool IsFavorite { get; set; }
    
    public bool IsDeleted { get; set; }
    public DateTimeOffset LastDateModified { get; set; } = DateTimeOffset.UtcNow;

}