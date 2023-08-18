using System.ComponentModel.DataAnnotations;

namespace Contact.ify.Domain.DTOs.Emails;

public class UpdateEmailRequest
{

    [Required]
    public int ContactEmailId { get; set; }
    
    [EmailAddress(ErrorMessage = "Email is in an invalid format")]
    [MinLength(4, ErrorMessage = "Email must be at least 4 characters long")]
    [MaxLength(255, ErrorMessage = "Email must not be longer than 255 characters")]
    public string Email { get; set; }
    
    public UpdateEmailRequest(string email)
    {
        Email = email;
    }
}