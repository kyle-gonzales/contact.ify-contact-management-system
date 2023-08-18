using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Contact.ify.DataAccess.Entities;

public class ContactPhoneNumber
{
    public int ContactPhoneNumberId { get; set; }

    [Required] [ForeignKey("ContactId")] public Contact Contact { get; set; } = null!;
    
    [Phone]
    [MaxLength(20)]
    public string PhoneNumber { get; set; }

    [Required] public bool IsDeleted { get; set; }

    public ContactPhoneNumber(string phoneNumber)
    {
        PhoneNumber = phoneNumber;
    }
}