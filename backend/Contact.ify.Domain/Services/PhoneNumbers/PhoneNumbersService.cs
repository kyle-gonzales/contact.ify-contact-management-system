using AutoMapper;
using Contact.ify.DataAccess.Entities;
using Contact.ify.DataAccess.UnitOfWork;
using Contact.ify.Domain.DTOs.PhoneNumbers;

namespace Contact.ify.Domain.Services.PhoneNumbers;

public class PhoneNumbersService : IPhoneNumbersService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    public PhoneNumbersService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }
    public async Task<int?> AddPhoneNumberForContactAsync(string userId, int contactId, CreatePhoneNumberRequest request)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        if (contact is null)
        {
            return null;
        }
        var phone = _mapper.Map<ContactPhoneNumber>(request);
        phone.Contact = contact;
        _unitOfWork.PhoneNumbers.AddPhoneNumber(phone);
        
        contact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(contactId, userId, ModificationType.Update, PropertyUpdated.PhoneNumbers);
        await _unitOfWork.CompleteAsync();
        return phone.ContactPhoneNumberId;
    }

    public async Task UpdatePhoneNumberForContactAsync(string userId, int contactId, UpdatePhoneNumberRequest request)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        if (contact is null)
        {
            return;
        }

        var phone = _mapper.Map<ContactPhoneNumber>(request);
        phone.Contact = contact;
        await _unitOfWork.PhoneNumbers.UpdatePhoneNumberAsync(phone);
        
        contact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(contactId, userId, ModificationType.Update, PropertyUpdated.PhoneNumbers);
        await _unitOfWork.CompleteAsync();
    }

    public async Task DeletePhoneNumberForUserAsync(string userId, int contactId, int id)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        var phone = await _unitOfWork.PhoneNumbers.GetPhoneNumberByIdForUserAsync(userId, id);

        if (contact is null || phone is null)
        {
            return;
        }
        _unitOfWork.PhoneNumbers.RemovePhoneNumber(phone);
        
        contact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(contactId, userId, ModificationType.Update, PropertyUpdated.PhoneNumbers);
        await _unitOfWork.CompleteAsync();
    }

    public async Task<ICollection<PhoneNumberResponse>> GetAllPhoneNumbersForUserAsync(string userId)
    {
        var phoneNumbers = await _unitOfWork.PhoneNumbers.GetAllPhoneNumbersForUserAsync(userId);
        var response = _mapper.Map<ICollection<PhoneNumberResponse>>(phoneNumbers);

        return response;
    }

    public async Task<PhoneNumberResponse?> GetPhoneNumberByIdForUserAsync(string userId, int id)
    {
        var phoneNumber = await _unitOfWork.PhoneNumbers.GetPhoneNumberByIdForUserAsync(userId, id);
        if (phoneNumber is null)
        {
            return null;
        }

        var response = _mapper.Map<PhoneNumberResponse>(phoneNumber);

        return response;
    }
}