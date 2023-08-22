namespace Contact.ify.Domain.DTOs.Users;

public class UserResponse
{
    public string UserName { get; set; } = string.Empty;
    
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? Email { get; set; }
}