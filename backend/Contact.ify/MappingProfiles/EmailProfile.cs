using AutoMapper;
using Contact.ify.DataAccess.Entities;
using Contact.ify.Domain.DTOs.Emails;

namespace Contact.ify.MappingProfiles;

public class EmailProfile : Profile
{
    public EmailProfile()
    {
        CreateMap<CreateEmailRequest, ContactEmail>();
        CreateMap<UpdateEmailRequest, ContactEmail>();
        CreateMap<ContactEmail, EmailResponse>();
    }
}