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

    public async Task UpdateEmailAsync(ContactEmail updatedEmail)
    {
        var email = await GetEmailByIdForUserAsync(updatedEmail.Contact.UserId, updatedEmail.ContactEmailId);
        if (email == null) // email does not exist
        {
            return;
        }
        email.Email = updatedEmail.Email;
    }

    public void RemoveEmail(ContactEmail email)
    {
        email.IsDeleted = true;
    }
    
    public async Task<ContactEmail?> GetEmailByIdForUserAsync(string userId, int id)
    {
        return await _context.Emails
            .FirstOrDefaultAsync(a =>
                a.Contact.UserId == userId &&
                a.ContactEmailId == id &&
                ! a.IsDeleted
            );
    }

    public async Task<ICollection<ContactEmail>?> GetAllEmailsForUserAsync(string userId)
    {
        return await _context.Emails
            .Where(a => a.Contact.UserId == userId && !a.IsDeleted)
            .ToListAsync();
    }
}