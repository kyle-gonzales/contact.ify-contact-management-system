using Contact.ify.DataAccess.Data;
using Contact.ify.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace Contact.ify.DataAccess.Repositories.Addresses;

public class AddressesRepository : IAddressesRepository
{
    private readonly ContactsContext _context;
    public AddressesRepository(ContactsContext context)
    {
        _context = context;
    }
    

    public void AddAddress(ContactAddress address)
    {
        _context.Addresses.Add(address);
    }

    public void UpdateAddress(ContactAddress targetAddress, ContactAddress updatedAddress)
    {
        targetAddress.Street = updatedAddress.Street ?? targetAddress.Street;
        targetAddress.City = updatedAddress.City ?? targetAddress.City;
        targetAddress.Province = updatedAddress.Province ?? targetAddress.Province;
        targetAddress.Country = updatedAddress.Country ?? targetAddress.Country;
        targetAddress.ZipCode = updatedAddress.ZipCode ?? targetAddress.ZipCode;
        targetAddress.AddressType = updatedAddress.AddressType;
    }

    public void RemoveAddress(ContactAddress address)
    {
        address.IsDeleted = true;
    }
    
    public async Task<ContactAddress?> GetAddressByIdForUserAsync(string userId, int contactId, int addressId)
    {
        return await _context.Addresses
            .Include(address => address.Contact)
            .FirstOrDefaultAsync(address =>
                address.Contact.UserId == userId &&
                address.Contact.ContactId == contactId &&
                address.ContactAddressId == addressId &&
                ! address.IsDeleted
            );
    }

    public async Task<ICollection<ContactAddress>> GetAllAddressesForUserAsync(string userId)
    {
        return await _context.Addresses
            .Include(address => address.Contact)
            .Where(address => address.Contact.UserId == userId && !address.IsDeleted)
            .ToListAsync();
    }
}