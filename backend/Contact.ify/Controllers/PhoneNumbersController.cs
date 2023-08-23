using Contact.ify.Domain.DTOs.PhoneNumbers;
using Contact.ify.Domain.Services.PhoneNumbers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Contact.ify.Controllers;

/// <summary>
/// 
/// </summary>
[Authorize]
[ApiController]
[Route("api/contacts/{contactId:int}/phoneNumbers")]
public class PhoneNumbersController : ControllerBase
{
    private readonly ILogger<PhoneNumbersController> _logger;
    private readonly IPhoneNumbersService _phoneNumbersService;
    

    /// <summary>
    /// 
    /// </summary>
    /// <param name="logger"></param>
    /// <param name="phoneNumbersService"></param>
    /// <exception cref="ArgumentNullException"></exception>
    public PhoneNumbersController(ILogger<PhoneNumbersController> logger, IPhoneNumbersService phoneNumbersService)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _phoneNumbersService = phoneNumbersService ?? throw new ArgumentNullException(nameof(phoneNumbersService));
    }
    
    
        /// <summary>
    /// 
    /// </summary>
    /// <param name="contactId"></param>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<int>> CreatePhoneNumber(int contactId, [FromBody] CreatePhoneNumberRequest request)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }
            var phoneNumberId = await _phoneNumbersService.AddPhoneNumberForContactAsync(userName, contactId, request);

            if (phoneNumberId is null)
            {
                return NotFound($"Failed to add User. Contact not Found: Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }
            
            return CreatedAtAction(nameof(GetPhoneNumber), new { contactId, id = phoneNumberId }, phoneNumberId);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to log a phone number");
            throw;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="id"></param>
    /// <param name="contactId"></param>
    /// <returns></returns>
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PhoneNumberResponse?>> GetPhoneNumber(int contactId, int id)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var phoneNumber = await _phoneNumbersService.GetPhoneNumberByIdForUserAsync(userName, contactId, id);

            if (phoneNumber is null)
            {
                return NotFound($"Phone Number Not Found: PhoneNumber with ID '{id}' for Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }
            
            return Ok(phoneNumber);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to get a phone number");
            throw;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="contactId"></param>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ICollection<PhoneNumberResponse>?>> GetAllPhoneNumbers(int contactId)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var response = await _phoneNumbersService.GetAllPhoneNumbersForUserAsync(userName, contactId);
            if (response is null)
            {
                return NotFound($"Failed To Get Phone Numbers. Contact not Found: Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }
            if (response.Count == 0)
            {
                return NoContent();
            }
            
            return Ok(response);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to get the phone numbers");
            throw;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="contactId"></param>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdatePhoneNumber(int contactId, [FromBody] UpdatePhoneNumberRequest request)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var isSuccess = await _phoneNumbersService.UpdatePhoneNumberForContactAsync(userName, contactId, request);

            if (!isSuccess)
            {
                return NotFound($"Phone Number Not Found: Phone Number with ID '{request.ContactPhoneNumberId}' for Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }

            return NoContent();
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to update the phone number");
            throw;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="contactId"></param>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeletePhoneNumber(int contactId, int id)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var isSuccess = await _phoneNumbersService.DeletePhoneNumberForUserAsync(userName, contactId, id);
            if (!isSuccess)
            {
                return NotFound($"Phone Number Not Found: Phone Number with ID '{id}' for Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }

            return NoContent();
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to delete the phone number");
            throw;
        }
    }
}