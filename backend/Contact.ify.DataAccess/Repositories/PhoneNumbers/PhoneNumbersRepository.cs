using Contact.ify.DataAccess.Data;
using Contact.ify.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace Contact.ify.DataAccess.Repositories.PhoneNumbers;

public class PhoneNumbersRepository : IPhoneNumbersRepository
{
    private readonly ContactsContext _context;

    public PhoneNumbersRepository(ContactsContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }
    
    public void AddPhoneNumber(ContactPhoneNumber phoneNumber)
    {
        _context.PhoneNumbers.Add(phoneNumber);
    }

    public void UpdatePhoneNumber(ContactPhoneNumber targetPhoneNumber, ContactPhoneNumber updatedPhoneNumber)
    {
        targetPhoneNumber.PhoneNumber = updatedPhoneNumber.PhoneNumber;
    }

    public void RemovePhoneNumber(ContactPhoneNumber phoneNumber)
    {
        phoneNumber.IsDeleted = true;
    }
    
    public async Task<ContactPhoneNumber?> GetPhoneNumberByIdForUserAsync(string userId, int contactId, int phoneNumberId)
    {
        return await _context.PhoneNumbers
            .Include(phone => phone.Contact)
            .FirstOrDefaultAsync(phone =>
                phone.Contact.UserId == userId &&
                phone.Contact.ContactId == contactId &&
                phone.ContactPhoneNumberId == phoneNumberId &&
                ! phone.IsDeleted
            );
    }

    public async Task<ICollection<ContactPhoneNumber>?> GetAllPhoneNumbersForUserAsync(string userId, int contactId)
    {
        return await _context.PhoneNumbers
            .Include(phone => phone.Contact)
            .Where(phone => 
                phone.Contact.UserId == userId &&
                phone.Contact.ContactId == contactId &&
                ! phone.IsDeleted)
            .ToListAsync();
    }
}