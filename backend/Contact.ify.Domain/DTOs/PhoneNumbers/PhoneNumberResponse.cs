using System.ComponentModel.DataAnnotations;

namespace Contact.ify.Domain.DTOs.PhoneNumbers;

public class PhoneNumberResponse
{
    public int ContactId { get; set; }
    public int ContactPhoneNumberId { get; set; }
    public string PhoneNumber { get; set; } = string.Empty;
}