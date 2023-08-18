using System.ComponentModel.DataAnnotations;

namespace Contact.ify.Domain.DTOs.PhoneNumbers;

public class UpdatePhoneNumberRequest
{
    [Required]
    public int ContactPhoneNumberId { get; set; }
    
    [Phone(ErrorMessage = "Phone Number is in an invalid format")]
    [MaxLength(20, ErrorMessage = "Phone Number cannot be longer than 20 characters")]
    public string PhoneNumber { get; set; }
    
    public UpdatePhoneNumberRequest(string phoneNumber)
    {
        PhoneNumber = phoneNumber;
    }
}