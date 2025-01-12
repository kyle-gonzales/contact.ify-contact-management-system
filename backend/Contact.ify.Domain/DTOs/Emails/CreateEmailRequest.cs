using System.ComponentModel.DataAnnotations;

namespace Contact.ify.Domain.DTOs.Emails;

public class CreateEmailRequest
{
    [RegularExpression(@"\S+@\S+\.\S+", ErrorMessage = "Email is in an invalid format")]
    [MinLength(4, ErrorMessage = "Email must be at least 4 characters long")]
    [MaxLength(255, ErrorMessage = "Email must not be longer than 255 characters")]
    public string Email { get; set; } = string.Empty;
}