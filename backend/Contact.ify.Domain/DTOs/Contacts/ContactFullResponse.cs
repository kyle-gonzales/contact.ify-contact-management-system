using Contact.ify.Domain.DTOs.Addresses;
using Contact.ify.Domain.DTOs.Emails;
using Contact.ify.Domain.DTOs.PhoneNumbers;

namespace Contact.ify.Domain.DTOs.Contacts;

public class ContactFullResponse
{
    public int ContactId { get; set; } 
    public string Name { get; set; } = string.Empty;
    
    public bool IsFavorite { get; set; }

    public List<EmailResponse> Emails { get; set; } = new();
    public List<PhoneNumberResponse> PhoneNumbers { get; set; } = new();
    public List<AddressSingleLineResponse> Addresses { get; set; } = new();

}