using AutoMapper;
using Contact.ify.DataAccess.Entities;
using Contact.ify.DataAccess.UnitOfWork;
using Contact.ify.Domain.DTOs.Emails;

namespace Contact.ify.Domain.Services.Emails;

public class EmailsService : IEmailsService
{
    
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public EmailsService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork= unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }
    public async Task<int?> AddEmailForContactAsync(string userId, int contactId, CreateEmailRequest request)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        if (contact is null)
        {
            return null;
        }

        var email = _mapper.Map<ContactEmail>(request);
        email.Contact = contact;
        _unitOfWork.Emails.AddEmail(email);
        
        contact.LastDateModified = DateTimeOffset.Now;
        
        _unitOfWork.AuditTrail.Add(contactId, userId, ModificationType.Update, PropertyUpdated.Emails);
        await _unitOfWork.CompleteAsync();
        return email.ContactEmailId;
    }

    public async Task UpdateEmailForContactAsync(string userId, int contactId, UpdateEmailRequest request)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        if (contact is null)
        {
            return;
        }

        var email = _mapper.Map<ContactEmail>(request);
        email.Contact = contact;
        await _unitOfWork.Emails.UpdateEmailAsync(email);

        contact.LastDateModified = DateTimeOffset.UtcNow;
    
        _unitOfWork.AuditTrail.Add(contactId, userId, ModificationType.Update, PropertyUpdated.Emails);
        await _unitOfWork.CompleteAsync();
    }

    public async Task DeleteEmailForUserAsync(string userId, int contactId, int id)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        var email = await _unitOfWork.Emails.GetEmailByIdForUserAsync(userId, id);

        if (contact is null || email is null)
        {
            return;
        }
        _unitOfWork.Emails.RemoveEmail(email);
        
        contact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(contactId, userId, ModificationType.Update, PropertyUpdated.Emails);
        await _unitOfWork.CompleteAsync();
    }

    public async Task<ICollection<EmailResponse>> GetAllEmailsForUserAsync(string userId)
    {
        var emails = await _unitOfWork.Emails.GetAllEmailsForUserAsync(userId);
        var response = _mapper.Map<ICollection<EmailResponse>>(emails);

        return response;
    }

    public async Task<EmailResponse?> GetEmailByIdForUserAsync(string userId, int id)
    {
        var email = await _unitOfWork.Emails.GetEmailByIdForUserAsync(userId, id);
        if (email is null)
        {
            return null;
        }
        var response = _mapper.Map<EmailResponse>(email);
        return response;
    }
}