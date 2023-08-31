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
        CreateMap<ContactAddress, AddressSingleLineResponse>()
            .ForMember(
                response => response.ContactId,
                option => option.MapFrom(
                    address => address.Contact.ContactId
                )
            )
            .ForMember(response => response.Address, option => option.MapFrom(address => MapAddressEntityToSingleLine(address)));
    }

    private static string MapAddressEntityToSingleLine(ContactAddress address)
    {
        var result = string.Empty;

        if (!string.IsNullOrEmpty(address.Street))
        {
            result += $"{address.Street}";
        }
        if (!string.IsNullOrEmpty(address.City))
        {
            result += $", {address.City}";
        }
        if (!string.IsNullOrEmpty(address.Province))
        {
            result += $", {address.Province}";
        }
        if (!string.IsNullOrEmpty(address.Country))
        {
            result += $", {address.Country}";
        }
        if (!string.IsNullOrEmpty(address.ZipCode))
        {
            result += $", {address.ZipCode}";
        }
        
        return result;
    }
}