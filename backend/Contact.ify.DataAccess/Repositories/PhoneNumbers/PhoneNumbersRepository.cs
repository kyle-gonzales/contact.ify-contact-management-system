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
        _context.PhoneNumbers.Remove(phoneNumber);
    }
    
    public async Task<ContactPhoneNumber?> GetPhoneNumberByIdForUserAsync(string userId, int id)
    {
        return await _context.PhoneNumbers
            .FirstOrDefaultAsync(a =>
                a.Contact.UserId == userId &&
                a.ContactPhoneNumberId == id);
    }

    public async Task<ICollection<ContactPhoneNumber>?> GetAllPhoneNumbersForUserAsync(string userId)
    {
        return await _context.PhoneNumbers.Where(a => a.Contact.UserId == userId).ToListAsync();
    }
}