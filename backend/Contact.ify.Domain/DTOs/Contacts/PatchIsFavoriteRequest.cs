using System.ComponentModel.DataAnnotations;

namespace Contact.ify.Domain.DTOs.Contacts;

public class PatchIsFavoriteRequest
{
    [Required]
    public bool IsFavorite { get; set; }
}