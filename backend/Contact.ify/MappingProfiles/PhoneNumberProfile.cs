using AutoMapper;
using Contact.ify.DataAccess.Entities;
using Contact.ify.Domain.DTOs.PhoneNumbers;

namespace Contact.ify.MappingProfiles;

public class PhoneNumberProfile : Profile
{
    public PhoneNumberProfile()
    {
        CreateMap<CreatePhoneNumberRequest, ContactPhoneNumber>();
        CreateMap<UpdatePhoneNumberRequest, ContactPhoneNumber>();
        CreateMap<ContactPhoneNumber, PhoneNumberResponse>()
            .ForMember(
                response => response.ContactId,
                option => 
                    option.MapFrom(phone => phone.Contact.ContactId)
            );
    }
}