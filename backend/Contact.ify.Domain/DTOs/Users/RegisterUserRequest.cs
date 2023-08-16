using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Contact.ify.DataAccess.Entities;

namespace Contact.ify.Domain.DTOs;

public class RegisterUserRequest
{
    
    [Required]
    [MinLength(1)]
    [MaxLength(15)]
    public string UserName { get; set; }
    
    [MinLength(1)]
    [MaxLength(35)]
    public string? FirstName { get; set; }
    
    [MinLength(1)]
    [MaxLength(35)]
    public string? LastName { get; set; }
    
    [EmailAddress]
    [MinLength(4)]
    [MaxLength(255)]
    public string? Email { get; set; }
    
    [MinLength(6)]
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