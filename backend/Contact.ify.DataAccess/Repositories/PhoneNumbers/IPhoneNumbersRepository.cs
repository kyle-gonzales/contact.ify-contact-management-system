using Contact.ify.DataAccess.Entities;

namespace Contact.ify.DataAccess.Repositories.PhoneNumbers;

public interface IPhoneNumbersRepository
{
    void AddPhoneNumber(ContactPhoneNumber phoneNumber);
    void UpdatePhoneNumber(ContactPhoneNumber targetPhoneNumber, ContactPhoneNumber updatedPhoneNumber);
    void RemovePhoneNumber(ContactPhoneNumber phoneNumber);
    Task<ContactPhoneNumber?> GetPhoneNumberByIdForUserAsync(string userId, int contactId, int phoneNumberId);
    Task<ICollection<ContactPhoneNumber>?> GetAllPhoneNumbersForUserAsync(string userId, int contactId);
}