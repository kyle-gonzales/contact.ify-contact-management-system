using Contact.ify.Domain.DTOs.Addresses;

namespace Contact.ify.Domain.Services.Addresses;

public interface IAddressesService
{
    Task<int?> AddAddressForContactAsync(string userId, int contactId, CreateAddressRequest request);
    Task<bool> UpdateAddressForContactAsync(string userId, int contactId, UpdateAddressRequest request);
    Task<bool> DeleteAddressForUserAsync(string userId, int contactId, int addressId);
    
    Task<AddressResponse?> GetAddressByIdForUserAsync(string userId, int contactId, int addressId);
    Task<ICollection<AddressResponse>?> GetAllAddressesForUserAsync(string userId, int contactId);
}