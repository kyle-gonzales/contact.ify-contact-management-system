using System.ComponentModel.DataAnnotations;

namespace Contact.ify.DataAccess.Entities;

public class User
{
    [MinLength(2)]
    [MaxLength(15)]
    public string UserId { get; set; }
    
    [MinLength(2)]
    [MaxLength(35)]
    public string? FirstName { get; set; }
    
    [MinLength(2)]
    [MaxLength(35)]
    public string? LastName { get; set; }
    
    [EmailAddress]
    [MinLength(4)]
    [MaxLength(255)]
    public string? Email { get; set; }
    
    public string PasswordHash { get; set; }
    
    public List<Contact> Contacts { get; set; }

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


        Contacts = new List<Contact>();
    }

}