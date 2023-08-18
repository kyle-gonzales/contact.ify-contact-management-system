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

    public async Task UpdateContactAsync(Entities.Contact updatedContact)
    {
        var contact = await GetContactByIdForUserAsync(updatedContact.UserId, updatedContact.ContactId);

        if (contact == null || contact.IsDeleted)
        {
            return;
        }
        contact.FirstName = updatedContact.FirstName ?? contact.FirstName;
        contact.LastName = updatedContact.LastName;
    }

    public async Task<Entities.Contact?> GetContactByIdForUserAsync(string userId, int id)
    {
        return await _context.Contacts.FirstOrDefaultAsync(c => c.UserId == userId && c.ContactId == id);
    }

    public async Task<Entities.Contact?> GetContactByIdIncludingRelationsForUserAsync(string userId, int id)
    {
        return await _context.Contacts
            .Include(c => c.Addresses
                .Where(a => ! a.IsDeleted))
            .Include(c => c.PhoneNumbers
                .Where(p => ! p.IsDeleted))
            .Include(c => c.Emails
                .Where( e => ! e.IsDeleted))
            .FirstOrDefaultAsync(c => c.UserId == userId && c.ContactId == id && !c.IsDeleted);
    }

    public async Task<ICollection<Entities.Contact>> GetAllContactsForUserAsync(string userId)
    {
        return await _context.Contacts.Where(c => c.UserId == userId && !c.IsDeleted).ToListAsync();
    }
}
