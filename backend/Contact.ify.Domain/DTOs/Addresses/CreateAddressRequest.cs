using System.ComponentModel.DataAnnotations;
using Contact.ify.DataAccess.Entities;

namespace Contact.ify.Domain.DTOs.Addresses;

public class CreateAddressRequest
{
    [MinLength(2, ErrorMessage = "Street should be at least 2 characters long")]
    [MaxLength(80, ErrorMessage = "Street must not exceed 80 characters")]
    public string? Street { get; set; }
    [MinLength(2, ErrorMessage = "City should be at least 2 characters long")]
    [MaxLength(80, ErrorMessage = "City must not exceed 80 characters")]
    public string? City { get; set; }
    [MinLength(2, ErrorMessage = "Province should be at least 2 characters long")]
    [MaxLength(80, ErrorMessage = "Province must not exceed 80 characters")]
    public string? Province { get; set; }
    [MinLength(2, ErrorMessage = "Country should be at least 2 characters long")]
    [MaxLength(80, ErrorMessage = "Country must not exceed 80 characters")]
    public string? Country { get; set; }
    [MinLength(2, ErrorMessage = "ZipCode should be at least 2 characters long")]
    [MaxLength(10, ErrorMessage = "ZipCode must not exceed 10 characters")]
    public string? ZipCode { get; set; }
    [Range(minimum:1, maximum:5, ErrorMessage = "Address Type must be between 1 and 5")] // range of enum
    public AddressType AddressType { get; set; }
}