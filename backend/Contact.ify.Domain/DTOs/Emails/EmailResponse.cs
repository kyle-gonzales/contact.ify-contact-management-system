namespace Contact.ify.Domain.DTOs.Emails;

public class EmailResponse
{
    public int ContactEmailId { get; set; }
    public string Email { get; set; }

    public EmailResponse(string email)
    {
        Email = email;
    }
}