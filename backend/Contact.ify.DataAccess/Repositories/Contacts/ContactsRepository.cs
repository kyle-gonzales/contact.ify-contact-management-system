using Contact.ify.DataAccess.Data;
using Microsoft.EntityFrameworkCore;

namespace Contact.ify.DataAccess.Repositories.Contacts;

public class ContactsRepository : IContactsRepository
{
    private readonly ContactsContext _context;

    public ContactsRepository(ContactsContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public void AddContact(Entities.Contact contact)
    {
        _context.Contacts.Add(contact);
    }

    public void DeleteContact(Entities.Contact contact)
    {
        contact.IsDeleted = true;
    }

    public void UpdateContact(Entities.Contact targetContact, Entities.Contact updatedContact)
    {
        targetContact.FirstName = updatedContact.FirstName ?? targetContact.FirstName;
        targetContact.LastName = updatedContact.LastName;
    }

    public async Task<Entities.Contact?> GetContactByIdForUserAsync(string userId, int contactId)
    {
        return await _context.Contacts.FirstOrDefaultAsync(c => 
            c.UserId == userId && 
            c.ContactId == contactId && 
            !c.IsDeleted
        );
    }

    public async Task<Entities.Contact?> GetContactByIdIncludingRelationsForUserAsync(string userId, int contactId)
    {
        return await _context.Contacts
            .Include(c => c.Addresses
                .Where(a => ! a.IsDeleted))
            .Include(c => c.PhoneNumbers
                .Where(p => ! p.IsDeleted))
            .Include(c => c.Emails
                .Where( e => ! e.IsDeleted))
            .FirstOrDefaultAsync(c =>
                c.UserId == userId &&
                c.ContactId == contactId &&
                !c.IsDeleted
            );
    }

    public async Task<ICollection<Entities.Contact>> GetAllContactsForUserAsync(string userId)
    {
        return await _context.Contacts
            .Where(c =>
                c.UserId == userId &&
                !c.IsDeleted)
            .OrderBy(c => c.LastName)
            .ThenBy(c=> c.FirstName ?? "")
            .ToListAsync();
    }

    public async Task<bool> ContactExistsForUserAsync(string userId, int contactId)
    {
        return await _context.Contacts.AnyAsync(c =>
            c.UserId == userId &&
            c.ContactId == contactId &&
            ! c.IsDeleted
        );
    }
}
