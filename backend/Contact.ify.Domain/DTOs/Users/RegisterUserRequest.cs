using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Contact.ify.DataAccess.Entities;

namespace Contact.ify.Domain.DTOs;

/// <summary>
/// A DTO containing user information for account registration
/// </summary>
public class RegisterUserRequest
{
    
    [Required(ErrorMessage = "The username is required")]
    [MinLength(1, ErrorMessage = "Username must be at least 1 character long")]
    [MaxLength(15, ErrorMessage = "Username must not exceed 15 characters")]
    public string UserName { get; set; }
    
    [MinLength(1, ErrorMessage = "Given name must be at least 1 character long")]
    [MaxLength(35, ErrorMessage = "Given name must not exceed 35 characters")]
    public string? FirstName { get; set; }
    
    [MinLength(1, ErrorMessage = "Surname must be at least 1 character long")]
    [MaxLength(35, ErrorMessage = "Surname must not exceed 35 characters")]
    public string? LastName { get; set; }
    
    [EmailAddress(ErrorMessage = "The input email is invalid")]
    [MinLength(4, ErrorMessage = "Email must be at least 4 characters long")]
    [MaxLength(255, ErrorMessage = "Email must not exceed 255 characters")]
    public string? Email { get; set; }
    
    [Required(ErrorMessage = "A password is required")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters long")]
    [PasswordPropertyText]
    public string Password { get; set; }

    public RegisterUserRequest(
        string userName,
        string password,
        string? firstName = null,
        string? lastName = null,
        string? email = null
    )
    {
        UserName = userName;
        FirstName = firstName;
        LastName = lastName;
        Password = password;
        Email = email;
    }

}