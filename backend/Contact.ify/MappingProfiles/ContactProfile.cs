using AutoMapper;
using Contact.ify.Domain.DTOs.Addresses;
using Contact.ify.Domain.DTOs.Contacts;
using Microsoft.IdentityModel.Tokens;

namespace Contact.ify.MappingProfiles;

public class ContactProfile : Profile
{
    public ContactProfile()
    {
        CreateMap<CreateContactRequest, DataAccess.Entities.Contact>();
        CreateMap<UpdateContactRequest, DataAccess.Entities.Contact>();
        CreateMap<DataAccess.Entities.Contact, ContactListItemResponse>();
        CreateMap<DataAccess.Entities.Contact, ContactFullResponse>()
            .ForMember(response => response.Name,
                option => option.MapFrom(contact => MapContactName(contact)));

    }

    private static string MapContactName(DataAccess.Entities.Contact contact)
    {
        var result = contact.LastName;
        if (!string.IsNullOrEmpty(contact.FirstName))
        {
            result += $", {contact.FirstName}";
        }
        return result;
    }

}