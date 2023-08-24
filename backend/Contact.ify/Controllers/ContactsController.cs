using Contact.ify.Domain.DTOs.Contacts;
using Contact.ify.Domain.Services.Contacts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Contact.ify.Controllers;

/// <summary>
/// Controller for working with a user's contacts
/// </summary>
[Authorize]
[ApiController]
[Route("api/contacts")]
public class ContactsController : ControllerBase
{
    private readonly ILogger<ContactsController> _logger;
    private readonly IContactsService _contactsService;

    /// <summary>
    /// Injects a logger and contacts service
    /// </summary>
    /// <param name="logger"></param>
    /// <param name="contactsService"></param>
    /// <exception cref="ArgumentNullException"></exception>
    public ContactsController(ILogger<ContactsController> logger, IContactsService contactsService)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _contactsService = contactsService ?? throw new ArgumentNullException(nameof(contactsService));
    }
    
    /// <summary>
    /// Adds a new contact for a user
    /// </summary>
    /// <param name="request">Request containing user information</param>
    /// <returns></returns>
    /// <response code="201">Contact created successfully. Returns the ID of the newly created contact</response>
    /// <response code="400">Missing field or invalid values</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="404">Contact not found, based on the given username</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<int>> CreateContact( [FromBody] CreateContactRequest request)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }
            
            if (userName != request.UserId)
            {
                return BadRequest("Username does not match request's User ID");
            }
            
            var contactId = await _contactsService.AddContactAsync(userName, request);

            return CreatedAtAction(
                nameof(GetContact),new { id = contactId },contactId);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong when trying to add a contact");
            throw;
        }
    }

    /// <summary>
    /// Gets a user's contact based on the contact ID
    /// </summary>
    /// <param name="id">Contact ID</param>
    /// <returns></returns>
    /// <response code="200">Successfully returns the contact</response>
    /// <response code="400">Missing field or invalid values</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="404">Contact not found, based on the given username or Contact ID</response>
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ContactFullResponse?>> GetContact(int id)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }
            var response = await _contactsService.GetContactByIdIncludingRelationsForUserAsync(userName, id);
            if (response is null)
            {
                return NotFound($"Contact Not Found: Contact with ID '{id}' belonging to User '{userName}' does not exist");
            }
            return Ok(response);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong when trying to get a contact");
            throw;
        }
    }

    /// <summary>
    /// Gets all the contacts of a user
    /// </summary>
    /// <returns></returns>
    /// <response code="200">Successfully returns the contact</response>
    /// <response code="204">Successfully completed the request. No contacts found</response>
    /// <response code="400">Missing field or invalid values</response>
    /// <response code="401">User not authenticated</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<ICollection<ContactListItemResponse>>> GetAllContacts()
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }
            var response = await _contactsService.GetContactListForUserAsync(userName);
            if (response.IsNullOrEmpty())
            {
                return NoContent();
            }
            return Ok(response);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong when trying to get the contacts");
            throw;
        }
    }

    /// <summary>
    /// Updates the first name, last name, and email of a contact
    /// </summary>
    /// <param name="request">Request containing the updated contact information</param>
    /// <returns></returns>
    /// <response code="204">Successfully updated the contact</response>
    /// <response code="400">Missing field or invalid values</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="404">Contact not found, based on the given username or Contact ID</response>
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateContact([FromBody] UpdateContactRequest request)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }
            if (userName != request.UserId)
            {
                return BadRequest("Username does not match request's user id");
            }
            
            var isSuccess = await _contactsService.UpdateContactAsync(userName, request);
            if (!isSuccess)
            {
                return NotFound($"Contact Not Found: Contact with ID '{request.ContactId}' belonging to User '{userName}' does not exist");
            }
            
            return NoContent();
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong when trying to update the contact");
            throw;
        }
    }

    /// <summary>
    /// Soft deletes a user's contact as by the Contact ID
    /// </summary>
    /// <param name="id">Contact ID</param>
    /// <returns></returns>
    /// <response code="204">Successfully deleted the contact</response>
    /// <response code="400">Missing field or invalid values</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="404">Contact not found, based on the given username or Contact ID</response>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteContact(int id)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var isSuccess = await _contactsService.DeleteContactAsync(userName, id);
            if (!isSuccess)
            {
                return NotFound($"Contact Not Found: Contact with ID '{id}' belonging to User '{userName}' does not exist");
            }
            return NoContent();
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong when trying to delete the contact");
            throw;
        }
    }
}