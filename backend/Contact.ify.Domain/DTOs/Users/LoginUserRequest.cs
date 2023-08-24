using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Contact.ify.Domain.DTOs.Users;

/// <summary>
/// A DTO containing login requirements
/// </summary>
public class LoginUserRequest
{
    [Required(ErrorMessage = "The username is required")]
    [MinLength(2, ErrorMessage = "Username must be at least 2 character long")]
    [MaxLength(15, ErrorMessage = "Username must not exceed 15 characters")]
    public string UserName { get; set; }

    [Required(ErrorMessage = "A password is required")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters long")]
    [PasswordPropertyText]
    public string Password { get; set; }

    public LoginUserRequest(string userName, string password)
    {
        UserName = userName;
        Password = password;
    }
}