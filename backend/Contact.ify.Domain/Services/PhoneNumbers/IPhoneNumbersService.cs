using Contact.ify.Domain.DTOs.PhoneNumbers;

namespace Contact.ify.Domain.Services.PhoneNumbers;

public interface IPhoneNumbersService
{
    Task<int?> AddPhoneNumberForContactAsync(string userId, int contactId, CreatePhoneNumberRequest request);
    Task<bool> UpdatePhoneNumberForContactAsync(string userId, int contactId, UpdatePhoneNumberRequest request);
    Task<bool> DeletePhoneNumberForUserAsync(string userId, int contactId, int phoneNumberId);
    Task<ICollection<PhoneNumberResponse>?> GetAllPhoneNumbersForUserAsync(string userId, int contactId);
    Task<PhoneNumberResponse?> GetPhoneNumberByIdForUserAsync(string userId, int contactId, int phoneNumberId);
}