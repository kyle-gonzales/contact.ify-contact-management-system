namespace Contact.ify.Domain.DTOs;

public class UserResponse
{
    public string UserName { get; set; }
    
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? Email { get; set; }

    public UserResponse(
        string userName,
        string firstName = null,
        string lastName = null,
        string email = null
    )
    {
        UserName = userName;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
    }
}