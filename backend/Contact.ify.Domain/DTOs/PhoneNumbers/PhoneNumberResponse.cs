using System.ComponentModel.DataAnnotations;

namespace Contact.ify.Domain.DTOs.PhoneNumbers;

public class PhoneNumberResponse
{
    public int ContactPhoneNumberId { get; set; }
    public string PhoneNumber { get; set; }
    
    public PhoneNumberResponse(string phoneNumber)
    {
        PhoneNumber = phoneNumber;
    }
}