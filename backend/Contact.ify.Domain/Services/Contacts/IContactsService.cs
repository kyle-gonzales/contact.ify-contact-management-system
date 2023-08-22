using Contact.ify.Domain.DTOs.Contacts;

namespace Contact.ify.Domain.Services.Contacts;

public interface IContactsService
{
    Task<int?> AddContact(string userId, CreateContactRequest request);
    Task<bool> UpdateContact(string userId, UpdateContactRequest request);
    Task DeleteContact(string userId, int id);

    Task<ContactFullResponse?> GetContactByIdIncludingRelationsForUserAsync(string userId, int id);
    Task<ICollection<ContactListItemResponse>> GetContactListForUserAsync(string userId);

}