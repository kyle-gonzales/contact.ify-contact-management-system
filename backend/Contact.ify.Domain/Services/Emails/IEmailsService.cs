using Contact.ify.Domain.DTOs.Emails;

namespace Contact.ify.Domain.Services.Emails;

public interface IEmailsService
{
    Task<int?> AddEmailForContactAsync(string userId, int contactId, CreateEmailRequest request);
    Task<ICollection<EmailResponse>> GetAllEmailsForUserAsync(string userId);
    Task<EmailResponse?> GetEmailByIdForUserAsync(string userId, int id);
    Task<bool> UpdateEmailForContactAsync(string userId, int contactId, UpdateEmailRequest request);
    Task<bool> DeleteEmailForUserAsync(string userId, int contactId, int id);
}