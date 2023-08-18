using Contact.ify.DataAccess.Entities;

namespace Contact.ify.DataAccess.Repositories.Addresses;

public interface IAddressesRepository
{
    void AddAddress(ContactAddress address);
    Task UpdateAddressAsync(ContactAddress updatedAddress);
    void RemoveAddress(ContactAddress address);
    Task<ContactAddress?> GetAddressByIdForUserAsync(string userId, int id);
    Task<ICollection<ContactAddress>?> GetAllAddressesForUserAsync(string userId);
}