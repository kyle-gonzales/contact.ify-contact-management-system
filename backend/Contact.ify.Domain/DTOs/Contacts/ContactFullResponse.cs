using Contact.ify.Domain.DTOs.Addresses;
using Contact.ify.Domain.DTOs.Emails;
using Contact.ify.Domain.DTOs.PhoneNumbers;

namespace Contact.ify.Domain.DTOs.Contacts;

public class ContactFullResponse
{
    public int ContactId { get; set; } 
    public string? FirstName { get; set; }
    public string LastName { get; set; }
    
    public bool IsFavorite { get; set; }
    
    public List<EmailResponse> Emails { get; set; }
    public List<PhoneNumberResponse> PhoneNumbers { get; set; }
    public List<AddressResponse> Addresses { get; set; }

    public ContactFullResponse(string? firstName, string lastName)
    {
        FirstName = firstName;
        LastName = lastName;

        Emails = new List<EmailResponse>();
        PhoneNumbers = new List<PhoneNumberResponse>();
        Addresses = new List<AddressResponse>();
    }
}