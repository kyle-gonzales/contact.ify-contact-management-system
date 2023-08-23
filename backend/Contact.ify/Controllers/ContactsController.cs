using Contact.ify.Domain.DTOs.Contacts;
using Contact.ify.Domain.Services.Contacts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Contact.ify.Controllers;

/// <summary>
/// 
/// </summary>
[Authorize]
[ApiController]
[Route("api/contacts")]
public class ContactsController : ControllerBase
{
    private readonly ILogger<ContactsController> _logger;
    private readonly IContactsService _contactsService;

    /// <summary>
    /// 
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
    /// 
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
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
            
            var contactId = await _contactsService.AddContact(userName, request);

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
    /// 
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
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
                return NotFound($"Contact with id '{id}' cannot be found");
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
    /// 
    /// </summary>
    /// <returns></returns>
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
    /// 
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
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
            
            var isSuccess = await _contactsService.UpdateContact(userName, request);
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
    /// 
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
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

            var isSuccess = await _contactsService.DeleteContact(userName, id);
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