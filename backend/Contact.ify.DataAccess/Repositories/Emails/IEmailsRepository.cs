using Contact.ify.DataAccess.Entities;

namespace Contact.ify.DataAccess.Repositories.Emails;

public interface IEmailsRepository
{
    void AddEmail(ContactEmail email);
    void UpdateEmail (ContactEmail targetEmail, ContactEmail updatedEmail);
    void RemoveEmail(ContactEmail email);
    Task<ContactEmail?> GetEmailByIdForUserAsync(string userId, int contactId, int emailId);
    Task<ICollection<ContactEmail>?> GetAllEmailsForUserAsync(string userId, int contactId);
}