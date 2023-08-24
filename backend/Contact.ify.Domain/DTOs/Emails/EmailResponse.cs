namespace Contact.ify.Domain.DTOs.Emails;

public class EmailResponse
{
    public int ContactId { get; set; }
    public int ContactEmailId { get; set; }
    public string Email { get; set; } = string.Empty;
}