using AutoMapper;
using Contact.ify.DataAccess.Entities;
using Contact.ify.DataAccess.UnitOfWork;
using Contact.ify.Domain.DTOs.Contacts;
using Microsoft.Extensions.Configuration;

namespace Contact.ify.Domain.Services.Contacts;

public class ContactsService : IContactsService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ContactsService(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration configuration)
    {
        _unitOfWork= unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }


    public async Task<int?> AddContact(string userId, CreateContactRequest request)
    {
        if (userId != request.UserId)
        {
            return null;
        }
        var contact = _mapper.Map<DataAccess.Entities.Contact>(request);
        _unitOfWork.Contacts.AddContact(contact);
        
        _unitOfWork.AuditTrail.Add(contact.ContactId, contact.UserId, ModificationType.Create);
        await _unitOfWork.CompleteAsync();
        return contact.ContactId;
    }
    

    public async Task<bool> UpdateContact(string userId, UpdateContactRequest request)
    {
        if (userId != request.UserId)
        {
            return false;
        }
        var contact = _mapper.Map<DataAccess.Entities.Contact>(request);
        await _unitOfWork.Contacts.UpdateContactAsync(contact);
        
        contact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(contact.ContactId, contact.UserId, ModificationType.Update);
        await _unitOfWork.CompleteAsync();
        
        return true;
    }

    public async Task DeleteContact(string userId, int id)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, id);

        if (contact is null)
        {
            return;
        }
        _unitOfWork.Contacts.DeleteContact(contact);
        
        contact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(contact.ContactId, contact.UserId, ModificationType.Delete);
        await _unitOfWork.CompleteAsync();
    }

    public async Task<ContactFullResponse?> GetContactByIdIncludingRelationsForUserAsync(string userId, int id)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdIncludingRelationsForUserAsync(userId, id);
        if (contact is null)
        {
            return null;
        }

        var response = _mapper.Map<ContactFullResponse>(contact);
        await _unitOfWork.CompleteAsync();
        return response;
    }

    public async Task<ICollection<ContactListItemResponse>> GetContactListForUserAsync(string userId)
    {
        var contacts = await _unitOfWork.Contacts.GetAllContactsForUserAsync(userId);

        var response = _mapper.Map<ICollection<ContactListItemResponse>>(contacts);
        
        return response;
    }
}