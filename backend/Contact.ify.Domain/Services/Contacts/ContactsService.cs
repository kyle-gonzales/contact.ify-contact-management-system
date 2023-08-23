using AutoMapper;
using Contact.ify.DataAccess.Entities;
using Contact.ify.DataAccess.UnitOfWork;
using Contact.ify.Domain.DTOs.Contacts;

namespace Contact.ify.Domain.Services.Contacts;

public class ContactsService : IContactsService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ContactsService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork= unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }


    public async Task<int> AddContactAsync(string userId, CreateContactRequest request)
    {
        var contact = _mapper.Map<DataAccess.Entities.Contact>(request);
        _unitOfWork.Contacts.AddContact(contact);
        
        _unitOfWork.AuditTrail.Add(contact.ContactId, contact.UserId, ModificationType.Create);
        await _unitOfWork.CompleteAsync();
        
        return contact.ContactId;
    }
    

    public async Task<bool> UpdateContactAsync(string userId, UpdateContactRequest request)
    {
        var targetAddress = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, request.ContactId);
        if (targetAddress is null)
        {
            return false;
        }
        
        var updatedContact = _mapper.Map<DataAccess.Entities.Contact>(request);
        _unitOfWork.Contacts.UpdateContact(targetAddress, updatedContact);
        
        updatedContact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(updatedContact.ContactId, updatedContact.UserId, ModificationType.Update);
        await _unitOfWork.CompleteAsync();
        
        return true;
    }

    public async Task<bool> DeleteContactAsync(string userId, int contactId)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        if (contact is null)
        {
            return false;
        }
        
        _unitOfWork.Contacts.DeleteContact(contact);
        
        contact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(contact.ContactId, contact.UserId, ModificationType.Delete);
        await _unitOfWork.CompleteAsync();
        
        return true;
    }

    public async Task<ContactFullResponse?> GetContactByIdIncludingRelationsForUserAsync(string userId, int contactId)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdIncludingRelationsForUserAsync(userId, contactId);
        if (contact is null)
        {
            return null;
        }

        var response = _mapper.Map<ContactFullResponse>(contact);
        return response;
    }

    public async Task<ICollection<ContactListItemResponse>> GetContactListForUserAsync(string userId)
    {
        var contacts = await _unitOfWork.Contacts.GetAllContactsForUserAsync(userId);

        var response = _mapper.Map<ICollection<ContactListItemResponse>>(contacts);
        return response;
    }
}