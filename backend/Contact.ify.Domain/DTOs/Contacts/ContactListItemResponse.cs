namespace Contact.ify.Domain.DTOs.Contacts;

public class ContactListItemResponse
{
    public int ContactId { get; set; } 
    public string? FirstName { get; set; }
    public string LastName { get; set; }
    
    public bool IsFavorite { get; set; }

    public ContactListItemResponse(string? firstName, string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
    }
}