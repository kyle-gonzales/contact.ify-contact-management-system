namespace Contact.ify.Domain.DTOs.Contacts;

public class ContactListItemResponse
{
    public int ContactId { get; set; } 
    public string? FirstName { get; set; }
    public string LastName { get; set; } = string.Empty;
    
    public bool IsFavorite { get; set; }
}