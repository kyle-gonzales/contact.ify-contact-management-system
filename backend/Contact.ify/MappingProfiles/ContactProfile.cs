using AutoMapper;
using Contact.ify.Domain.DTOs.Addresses;
using Contact.ify.Domain.DTOs.Contacts;

namespace Contact.ify.MappingProfiles;

public class ContactProfile : Profile
{
    public ContactProfile()
    {
        CreateMap<CreateContactRequest, DataAccess.Entities.Contact>();
        CreateMap<UpdateAddressRequest, DataAccess.Entities.Contact>();
        CreateMap<DataAccess.Entities.Contact, ContactListItemResponse>();
        CreateMap<DataAccess.Entities.Contact, ContactFullResponse>();
    }
}