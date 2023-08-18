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

    public async Task UpdateAddressAsync(ContactAddress updatedAddress)
    {
        var address = await GetAddressByIdForUserAsync(updatedAddress.Contact.UserId, updatedAddress.ContactAddressId);

        if (address == null) // address does not exist
        {
            return;
        }
        address.Street = updatedAddress.Street ?? address.Street;
        address.City = updatedAddress.City ?? address.City;
        address.Province = updatedAddress.Province ?? address.Province;
        address.Country = updatedAddress.Country ?? address.Country;
        address.ZipCode = updatedAddress.ZipCode ?? address.ZipCode;
        address.AddressType = updatedAddress.AddressType;
    }

    public void RemoveAddress(ContactAddress address)
    {
        _context.Addresses.Remove(address);
    }
    
    public async Task<ContactAddress?> GetAddressByIdForUserAsync(string userId, int id)
    {
        return await _context.Addresses
            .FirstOrDefaultAsync(a =>
                a.Contact.UserId == userId &&
                a.ContactAddressId == id);
    }

    public async Task<ICollection<ContactAddress>?> GetAllAddressesForUserAsync(string userId)
    {
        return await _context.Addresses.Where(a => a.Contact.UserId == userId).ToListAsync();
    }
}