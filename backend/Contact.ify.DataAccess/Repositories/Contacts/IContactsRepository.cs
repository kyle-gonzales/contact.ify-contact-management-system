
namespace Contact.ify.DataAccess.Repositories.Contacts;

public interface IContactsRepository
{
    void AddContact(Entities.Contact contact);
    void DeleteContact(Entities.Contact contact);
    void UpdateContact(Entities.Contact targetContact, Entities.Contact updatedContact);

    Task<Entities.Contact?> GetContactByIdForUserAsync(string userId, int contactId); 
    Task<Entities.Contact?> GetContactByIdIncludingRelationsForUserAsync (string userId, int contactId);
    Task<ICollection<Entities.Contact>> GetAllContactsForUserAsync(string userId);
    Task<bool> ContactExistsForUserAsync(string userId, int contactId);
}