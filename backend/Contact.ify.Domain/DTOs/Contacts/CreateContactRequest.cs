using System.ComponentModel.DataAnnotations;

namespace Contact.ify.Domain.DTOs.Contacts;

public class CreateContactRequest
{
    [MinLength(2, ErrorMessage = "First name must be at least 2 characters long")]
    [MaxLength(35, ErrorMessage = "First name cannot be longer than 35 characters")]
    public string? FirstName { get; set; }
    
    [Required(ErrorMessage = "Last name is required")]
    [MinLength(2, ErrorMessage = "Last name must be at least 2 characters long")]
    [MaxLength(35, ErrorMessage = "Last name cannot be longer than 35 characters")]
    public string LastName { get; set; }

    public CreateContactRequest(string? firstName, string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
    }
}