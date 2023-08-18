using Contact.ify.Domain.DTOs.Contacts;

namespace Contact.ify.Domain.Services.Contacts;

public interface IContactsService
{
    void AddContact(string userId, CreateContactRequest request);
    void UpdateContact(string userId, UpdateContactRequest request);
    void DeleteContact(string userId, int id);

    Task<ContactFullResponse?> GetContactByIdIncludingRelationsForUserAsync(string userId, int id);
    Task<ICollection<ContactListItemResponse>> GetContactListForUserAsync(string userId);

}