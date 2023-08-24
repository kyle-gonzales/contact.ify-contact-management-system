using System.ComponentModel.DataAnnotations;

namespace Contact.ify.Domain.DTOs.Users;

public class UpdateUserRequest
{
    [MinLength(2, ErrorMessage = "Given name must be at least 2 character long")]
    [MaxLength(35, ErrorMessage = "Given name must not exceed 35 characters")]
    public string? FirstName { get; set; }
    
    [MinLength(2, ErrorMessage = "Last name must be at least 2 character long")]
    [MaxLength(35, ErrorMessage = "Last name must not exceed 35 characters")]
    public string? LastName { get; set; }
    
    [EmailAddress]
    
    public string? Email { get; set; }
}