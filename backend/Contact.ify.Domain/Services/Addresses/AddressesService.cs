using AutoMapper;
using Contact.ify.DataAccess.Entities;
using Contact.ify.DataAccess.UnitOfWork;
using Contact.ify.Domain.DTOs.Addresses;

namespace Contact.ify.Domain.Services.Addresses;

public class AddressesService : IAddressesService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public AddressesService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork= unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<int?> AddAddressForContactAsync(string userId, int contactId, CreateAddressRequest request)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        if (contact is null)
        {
            return null;
        }
        var address = _mapper.Map<ContactAddress>(request);
        address.Contact = contact;
        _unitOfWork.Addresses.AddAddress(address);
        
        contact.LastDateModified = DateTimeOffset.UtcNow;
        
        _unitOfWork.AuditTrail.Add(contact.ContactId, contact.UserId, ModificationType.Update, PropertyUpdated.Addresses);
        await _unitOfWork.CompleteAsync();
        return address.ContactAddressId;
    }

    public async Task<bool> UpdateAddressForContactAsync(string userId, int contactId, UpdateAddressRequest request)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        if (contact is null)
            return false;

        var address = _mapper.Map<ContactAddress>(request);
        address.Contact = contact;
        await _unitOfWork.Addresses.UpdateAddressAsync(address);

        contact.LastDateModified = DateTimeOffset.UtcNow;
        
        _unitOfWork.AuditTrail.Add(contact.ContactId, contact.UserId, ModificationType.Update, PropertyUpdated.Addresses);
        await _unitOfWork.CompleteAsync();
        return true;
    }

    public async Task<bool> DeleteAddressForUserAsync(string userId, int contactId, int id)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        var address = await _unitOfWork.Addresses.GetAddressByIdForUserAsync(userId, id);

        if (address is null || contact is null)
            return false;
        
        _unitOfWork.Addresses.RemoveAddress(address);
        
        contact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(contact.ContactId, contact.UserId, ModificationType.Update, PropertyUpdated.Addresses);
        await _unitOfWork.CompleteAsync();
        return true;
    }

    public async Task<ICollection<AddressResponse>> GetAllAddressesForUserAsync(string userId)
    {
        var addresses =  await _unitOfWork.Addresses.GetAllAddressesForUserAsync(userId);
        var response = _mapper.Map<ICollection<ContactAddress>, ICollection<AddressResponse>>(addresses);

        return response;
    }

    public async Task<AddressResponse?> GetAddressByIdForUserAsync(string userId, int id)
    {
        var address =  await _unitOfWork.Addresses.GetAddressByIdForUserAsync(userId, id);

        if (address == null)
        {
            return null;
        }
        var response = _mapper.Map<ContactAddress, AddressResponse>(address);
        return response;
    }
}