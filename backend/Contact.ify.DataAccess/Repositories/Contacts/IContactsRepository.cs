
namespace Contact.ify.DataAccess.Repositories.Contacts;

public interface IContactsRepository
{
    void AddContact(Entities.Contact contact);
    void DeleteContact(Entities.Contact contact);
    Task UpdateContactAsync(Entities.Contact updatedContact);

    Task<Entities.Contact?> GetContactByIdForUserAsync(string userId, int id); 
    Task<Entities.Contact?> GetContactByIdIncludingRelationsForUserAsync (string userId, int id);
    Task<ICollection<Entities.Contact>> GetAllContactsForUserAsync(string userId);

}