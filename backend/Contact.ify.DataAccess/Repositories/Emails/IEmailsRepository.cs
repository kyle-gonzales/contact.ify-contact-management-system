using Contact.ify.DataAccess.Entities;

namespace Contact.ify.DataAccess.Repositories.Emails;

public interface IEmailsRepository
{
    void AddEmail(ContactEmail email);
    Task UpdateEmailAsync (ContactEmail updatedEmail);
    void RemoveEmail(ContactEmail email);
    Task<ContactEmail?> GetEmailByIdForUserAsync(string userId, int id);
    Task<ICollection<ContactEmail>?> GetAllEmailsForUserAsync(string userId);
}