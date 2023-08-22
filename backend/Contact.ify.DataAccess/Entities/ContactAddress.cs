using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Contact.ify.DataAccess.Entities;

public class ContactAddress
{
    public int ContactAddressId { get; set; }

    [Required] [ForeignKey("ContactId")] public Contact Contact { get; set; } = null!;
    
    [MinLength(2)]
    [MaxLength(80)]
    public string? Street { get; set; }
    [MinLength(2)]
    [MaxLength(80)]
    public string? City { get; set; }
    [MinLength(2)]
    [MaxLength(80)]
    public string? Province { get; set; }
    [MinLength(2)]
    [MaxLength(80)]
    public string? Country { get; set; }
    [MinLength(2)]
    [MaxLength(10)]
    public string? ZipCode { get; set; }

    public AddressType AddressType { get; set; } = AddressType.Work;

    [Required] public bool IsDeleted { get; set; }
}

public enum AddressType
{
    Delivery = 1,
    Billing = 2,
    Work = 3,
    Home = 4,
    Other = 5,
}