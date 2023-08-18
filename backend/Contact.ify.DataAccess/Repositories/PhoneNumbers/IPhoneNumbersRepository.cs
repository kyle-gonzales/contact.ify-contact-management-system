using Contact.ify.DataAccess.Entities;

namespace Contact.ify.DataAccess.Repositories.PhoneNumbers;

public interface IPhoneNumbersRepository
{
    void AddPhoneNumber(ContactPhoneNumber phoneNumber);
    Task UpdatePhoneNumberAsync(ContactPhoneNumber updatedPhoneNumber);
    void RemovePhoneNumber(ContactPhoneNumber phoneNumber);
    Task<ContactPhoneNumber?> GetPhoneNumberByIdForUserAsync(string userId, int id);
    Task<ICollection<ContactPhoneNumber>?> GetAllPhoneNumbersForUserAsync(string userId);
}