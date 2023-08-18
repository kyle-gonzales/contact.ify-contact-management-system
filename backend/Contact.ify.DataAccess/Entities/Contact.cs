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
    public string LastName { get; set; }

    public List<ContactAddress> Addresses { get; set; }
    public List<ContactPhoneNumber> PhoneNumbers { get; set; }
    public List<ContactEmail> Emails { get; set; }
    
    public bool IsFavorite { get; set; }
    
    public bool IsDeleted { get; set; }
    public DateTimeOffset LastDateModified { get; set; }

    public Contact(
        string lastName,
        DateTimeOffset lastDateModified,
        string? firstName = null
    )
    {
        LastName = lastName;
        LastDateModified = lastDateModified;
        FirstName = firstName;
        
        Addresses = new List<ContactAddress>();
        PhoneNumbers = new List<ContactPhoneNumber>();
        Emails = new List<ContactEmail>();
    }
}