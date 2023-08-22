using AutoMapper;
using Contact.ify.DataAccess.Entities;
using Contact.ify.Domain.DTOs.Addresses;

namespace Contact.ify.MappingProfiles;

public class AddressProfile : Profile
{
    public AddressProfile()
    {
        CreateMap<CreateAddressRequest, ContactAddress>();
        CreateMap<UpdateAddressRequest, ContactAddress>();
        CreateMap<ContactAddress, AddressResponse>()
            .ForMember(
                response => response.ContactId,
                option => option.MapFrom(
                    address => address.Contact.ContactId
                )
            );
    }
}