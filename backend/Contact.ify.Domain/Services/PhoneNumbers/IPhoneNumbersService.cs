using Contact.ify.Domain.DTOs.PhoneNumbers;

namespace Contact.ify.Domain.Services.PhoneNumbers;

public interface IPhoneNumbersService
{
    Task<int?> AddPhoneNumberForContactAsync(string userId, int contactId, CreatePhoneNumberRequest request);
    Task UpdatePhoneNumberForContactAsync(string userId, int contactId, UpdatePhoneNumberRequest request);
    Task DeletePhoneNumberForUserAsync(string userId, int contactId, int id);
    Task<ICollection<PhoneNumberResponse>> GetAllPhoneNumbersForUserAsync(string userId);
    Task<PhoneNumberResponse?> GetPhoneNumberByIdForUserAsync(string userId, int id);
}