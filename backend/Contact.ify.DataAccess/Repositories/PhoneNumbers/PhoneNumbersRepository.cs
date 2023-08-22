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

    public async Task UpdatePhoneNumberAsync(ContactPhoneNumber updatedPhoneNumber)
    {
        var phoneNumber = await GetPhoneNumberByIdForUserAsync(updatedPhoneNumber.Contact.UserId, updatedPhoneNumber.ContactPhoneNumberId);
        if (phoneNumber == null) // phoneNumber does not exist
        {
            return;
        }
        phoneNumber.PhoneNumber = updatedPhoneNumber.PhoneNumber;
    }

    public void RemovePhoneNumber(ContactPhoneNumber phoneNumber)
    {
        phoneNumber.IsDeleted = true;
    }
    
    public async Task<ContactPhoneNumber?> GetPhoneNumberByIdForUserAsync(string userId, int id)
    {
        return await _context.PhoneNumbers
            .Include(phone => phone.Contact)
            .FirstOrDefaultAsync(phone =>
                phone.Contact.UserId == userId &&
                phone.ContactPhoneNumberId == id &&
                ! phone.IsDeleted
            );
    }

    public async Task<ICollection<ContactPhoneNumber>?> GetAllPhoneNumbersForUserAsync(string userId)
    {
        return await _context.PhoneNumbers
            .Include(phone => phone.Contact)
            .Where(phone => phone.Contact.UserId == userId && ! phone.IsDeleted)
            .ToListAsync();
    }
}