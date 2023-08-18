using Contact.ify.DataAccess.Entities;

namespace Contact.ify.Domain.Services.Addresses;

public interface IAddressesService
{
    Task<bool> AddAddress();
    Task<bool> UpdateAddress();
    Task<bool> RemoveAddress();
    
    Task<ICollection<ContactAddress>?> GetAllAddressesForUserAsync(string userId);
    Task<ContactAddress?> GetAddressByIdForUserAsync(string userId, int id);
}