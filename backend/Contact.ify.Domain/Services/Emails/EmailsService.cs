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

    public async Task<bool> UpdateEmailForContactAsync(string userId, int contactId, UpdateEmailRequest request)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        if (contact is null)
        {
            return false;
        }
        
        var targetEmail = await _unitOfWork.Emails.GetEmailByIdForUserAsync(userId, contactId, request.ContactEmailId);
        if (targetEmail is null) // email does not exist
        {
            return false;
        }

        var updatedEmail = _mapper.Map<ContactEmail>(request);
        updatedEmail.Contact = contact;
        _unitOfWork.Emails.UpdateEmail(targetEmail, updatedEmail);

        contact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(contactId, userId, ModificationType.Update, PropertyUpdated.Emails);
        await _unitOfWork.CompleteAsync();

        return true;
    }

    public async Task<bool> DeleteEmailForUserAsync(string userId, int contactId, int emailId)
    {
        var contact = await _unitOfWork.Contacts.GetContactByIdForUserAsync(userId, contactId);
        if (contact is null)
        {
            return false;
        }
        var email = await _unitOfWork.Emails.GetEmailByIdForUserAsync(userId, contactId, emailId);
        if (email is null)
        {
            return false;
        }
            
        _unitOfWork.Emails.RemoveEmail(email);
        
        contact.LastDateModified = DateTimeOffset.UtcNow;
        _unitOfWork.AuditTrail.Add(contactId, userId, ModificationType.Update, PropertyUpdated.Emails);
        await _unitOfWork.CompleteAsync();
        
        return true;
    }

    public async Task<ICollection<EmailResponse>?> GetAllEmailsForUserAsync(string userId, int contactId)
    {
        var contactExists = await _unitOfWork.Contacts.ContactExistsForUserAsync(userId, contactId);
        if (!contactExists)
        {
            return null;
        }
        
        var emails = await _unitOfWork.Emails.GetAllEmailsForUserAsync(userId, contactId);
        
        var response = _mapper.Map<ICollection<EmailResponse>>(emails);
        return response;
    }

    public async Task<EmailResponse?> GetEmailByIdForUserAsync(string userId, int contactId, int emailId)
    {
        var email = await _unitOfWork.Emails.GetEmailByIdForUserAsync(userId, contactId, emailId);
        if (email is null)
        {
            return null;
        }

        var response = _mapper.Map<EmailResponse>(email);
        return response;
    }
}