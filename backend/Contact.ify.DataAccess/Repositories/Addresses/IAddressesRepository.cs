using Contact.ify.DataAccess.Entities;

namespace Contact.ify.DataAccess.Repositories.Addresses;

public interface IAddressesRepository
{
    void AddAddress(ContactAddress address);
    void UpdateAddress(ContactAddress targetAddress, ContactAddress updatedAddress);
    void RemoveAddress(ContactAddress address);
    Task<ICollection<ContactAddress>> GetAllAddressesForUserAsync(string userId);
    Task<ContactAddress?> GetAddressByIdForUserAsync(string userId, int contactId, int addressId);
}