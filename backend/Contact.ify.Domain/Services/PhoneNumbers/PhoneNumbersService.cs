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

    public async Task<bool> UpdatePhoneNumberForContactAsync(string userId, int contactId, UpdatePhoneNumberRequest request)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        if (contact is null)
        {
            return false;
        }
        var updatedPhoneNumber = _mapper.Map<ContactPhoneNumber>(request);
        updatedPhoneNumber.Contact = contact;
        
        var targetPhoneNumber = await
            _unitOfWork.PhoneNumbers.GetPhoneNumberByIdForUserAsync(userId, contactId, request.ContactPhoneNumberId);
        if (targetPhoneNumber is null)
        {
            return false;
        }
        _unitOfWork.PhoneNumbers.UpdatePhoneNumber(targetPhoneNumber, updatedPhoneNumber);
        
        contact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(contactId, userId, ModificationType.Update, PropertyUpdated.PhoneNumbers);
        await _unitOfWork.CompleteAsync();

        return true;
    }

    public async Task<bool> DeletePhoneNumberForUserAsync(string userId, int contactId, int phoneNumberId)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        if (contact is null)
        {
            return false;
        }
        var phone = await _unitOfWork.PhoneNumbers.GetPhoneNumberByIdForUserAsync(userId, contactId, phoneNumberId);
        if (phone is null)
        {
            return false;
        }
        
        _unitOfWork.PhoneNumbers.RemovePhoneNumber(phone);
        
        contact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(contactId, userId, ModificationType.Update, PropertyUpdated.PhoneNumbers);
        await _unitOfWork.CompleteAsync();

        return true;
    }

    public async Task<ICollection<PhoneNumberResponse>?> GetAllPhoneNumbersForUserAsync(string userId, int contactId)
    {
        var contactExists = await _unitOfWork.Contacts.ContactExistsForUserAsync(userId, contactId);
        if (!contactExists)
        {
            return null;
        }
        
        var phoneNumbers = await _unitOfWork.PhoneNumbers.GetAllPhoneNumbersForUserAsync(userId, contactId);
        
        var response = _mapper.Map<ICollection<PhoneNumberResponse>>(phoneNumbers);
        return response;
    }

    public async Task<PhoneNumberResponse?> GetPhoneNumberByIdForUserAsync(string userId, int contactId, int phoneNumberId)
    {
        var phoneNumber = await _unitOfWork.PhoneNumbers.GetPhoneNumberByIdForUserAsync(userId, contactId, phoneNumberId);
        if (phoneNumber is null)
        {
            return null;
        }

        var response = _mapper.Map<PhoneNumberResponse>(phoneNumber);
        return response;
    }
}