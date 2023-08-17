using System.ComponentModel.DataAnnotations;

namespace Contact.ify.DataAccess.Entities;

public class User
{
    [Required]
    [MinLength(1)]
    [MaxLength(15)]
    public string UserId { get; set; }
    
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
    
    public string PasswordHash { get; set; }


    public User()
    {
    }

    public User(
        string userId,
        string passwordHash,
        string? firstName = null,
        string? lastName = null,
        string? email = null
    )
    {
        UserId = userId;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        PasswordHash = passwordHash;
    }

}