using Contact.ify.DataAccess.Data;
using Contact.ify.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace Contact.ify.DataAccess.Repositories.Emails;

public class EmailsRepository : IEmailsRepository
{
    private readonly ContactsContext _context;

    public EmailsRepository(ContactsContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public void AddEmail(ContactEmail email)
    {
        _context.Emails.Add(email);
    }

    public void UpdateEmail(ContactEmail targetEmail, ContactEmail updatedEmail)
    {
        targetEmail.Email = updatedEmail.Email;
    }

    public void RemoveEmail(ContactEmail email)
    {
        email.IsDeleted = true;
    }
    
    public async Task<ContactEmail?> GetEmailByIdForUserAsync(string userId, int contactId, int emailId)
    {
        return await _context.Emails
            .Include(email => email.Contact)
            .FirstOrDefaultAsync(email =>
                email.Contact.UserId == userId &&
                email.Contact.ContactId == contactId &&
                email.ContactEmailId == emailId &&
                ! email.IsDeleted
            );
    }

    public async Task<ICollection<ContactEmail>?> GetAllEmailsForUserAsync(string userId)
    {
        return await _context.Emails
            .Include(email => email.Contact)
            .Where(email => email.Contact.UserId == userId && !email.IsDeleted)
            .ToListAsync();
    }
}