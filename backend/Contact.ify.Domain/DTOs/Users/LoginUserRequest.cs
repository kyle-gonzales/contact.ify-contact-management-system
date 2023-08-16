using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Contact.ify.Domain.DTOs;

public class LoginUserRequest
{
    [Required]
    [MinLength(1)]
    [MaxLength(15)]
    public string UserName { get; set; }

    [Required]
    [MinLength(6)]
    [PasswordPropertyText]
    public string Password { get; set; }

    public LoginUserRequest(string userName, string password)
    {
        UserName = userName;
        Password = password;
    }
}