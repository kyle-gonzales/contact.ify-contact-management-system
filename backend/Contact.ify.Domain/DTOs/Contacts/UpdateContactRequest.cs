using System.ComponentModel.DataAnnotations;

namespace Contact.ify.Domain.DTOs.Contacts;

public class UpdateContactRequest
{
    [Required]
    public int ContactId { get; set; }
    
    [MinLength(2, ErrorMessage = "First name must be at least 2 characters long")]
    [MaxLength(35, ErrorMessage = "First name cannot be longer than 35 characters")]
    public string? FirstName { get; set; }
    
    [Required(ErrorMessage = "Last name is required")]
    [MinLength(2, ErrorMessage = "Last name must be at least 2 characters long")]
    [MaxLength(35, ErrorMessage = "Last name cannot be longer than 35 characters")]
    public string LastName { get; set; }
    public bool IsFavorite { get; set; }
    
    public UpdateContactRequest(string lastName, string? firstName, bool isFavorite)
    {
        LastName = lastName;
        FirstName = firstName;
        IsFavorite = isFavorite;
    }

}