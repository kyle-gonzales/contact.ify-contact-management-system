using System.ComponentModel.DataAnnotations;

namespace Contact.ify.Domain.DTOs.PhoneNumbers;

public class CreatePhoneNumberRequest
{

    [Phone(ErrorMessage = "Phone Number is in an invalid format")]
    [MaxLength(20, ErrorMessage = "Phone Number cannot be longer than 20 characters")]
    public string PhoneNumber { get; set; }
    
    public CreatePhoneNumberRequest(string phoneNumber)
    {
        PhoneNumber = phoneNumber;
    }
}