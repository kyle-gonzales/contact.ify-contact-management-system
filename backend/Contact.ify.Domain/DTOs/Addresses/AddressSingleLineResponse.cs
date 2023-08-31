using Contact.ify.DataAccess.Entities;

namespace Contact.ify.Domain.DTOs.Addresses;

public class AddressSingleLineResponse
{
    public int ContactId { get; set; }
    public int ContactAddressId { get; set; }
    public string Address { get; set; }
    public AddressType AddressType { get; set; }
}