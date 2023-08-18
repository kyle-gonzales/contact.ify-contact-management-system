using System.ComponentModel.DataAnnotations;
using Contact.ify.DataAccess.Entities;

namespace Contact.ify.Domain.DTOs.Addresses;

public class AddressResponse
{
    public int ContactAddressId { get; set; }
    public string? Street { get; set; }
    public string? City { get; set; }
    public string? Province { get; set; }
    public string? Country { get; set; }
    public string? ZipCode { get; set; }
    public AddressType AddressType { get; set; }
    
    public AddressResponse(
        string? street = null,
        string? city = null,
        string? province = null,
        string? country = null,
        string? zipCode = null,
        AddressType addressType = AddressType.Billing
    )
    {
        Street = street;
        City = city;
        Province = province;
        Country = country;
        ZipCode = zipCode;
        AddressType = addressType;
    }
}