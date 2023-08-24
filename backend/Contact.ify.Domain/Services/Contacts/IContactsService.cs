using Contact.ify.Domain.DTOs.Contacts;

namespace Contact.ify.Domain.Services.Contacts;

public interface IContactsService
{
    Task<int> AddContactAsync(string userId, CreateContactRequest request);
    Task<bool> UpdateContactAsync(string userId, UpdateContactRequest request);
    Task<bool> DeleteContactAsync(string userId, int id);

    Task<ContactFullResponse?> GetContactByIdIncludingRelationsForUserAsync(string userId, int id);
    Task<ICollection<ContactListItemResponse>> GetContactListForUserAsync(string userId);

}