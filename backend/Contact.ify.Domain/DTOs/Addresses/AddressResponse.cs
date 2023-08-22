using Contact.ify.DataAccess.Entities;

namespace Contact.ify.Domain.DTOs.Addresses;

public class AddressResponse
{
    public int ContactId { get; set; }
    public int ContactAddressId { get; set; }
    public string? Street { get; set; }
    public string? City { get; set; }
    public string? Province { get; set; }
    public string? Country { get; set; }
    public string? ZipCode { get; set; }
    public AddressType AddressType { get; set; }
}