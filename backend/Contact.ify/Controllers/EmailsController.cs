using Contact.ify.Domain.DTOs.Emails;
using Contact.ify.Domain.Services.Emails;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Contact.ify.Controllers;

/// <summary>
/// Controller for working with the emails of a user's contact
/// </summary>
[Authorize]
[ApiController]
[Route("api/contacts/{contactId:int}/emails")]
public class EmailsController : ControllerBase
{
    private readonly ILogger<EmailsController> _logger;
    private readonly IEmailsService _emailsService;

    /// <summary>
    /// Injects a logger and emails service
    /// </summary>
    /// <param name="logger"></param>
    /// <param name="emailsService"></param>
    /// <exception cref="ArgumentNullException"></exception>
    public EmailsController(ILogger<EmailsController> logger, IEmailsService emailsService)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _emailsService = emailsService ?? throw new ArgumentNullException(nameof(emailsService));
    }
    
    /// <summary>
    /// Adds a new email to an existing contact
    /// </summary>
    /// <param name="contactId"></param>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<int>> CreateEmail(int contactId, [FromBody] CreateEmailRequest request)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }
            var emailId = await _emailsService.AddEmailForContactAsync(userName, contactId, request);

            if (emailId is null)
            {
                return NotFound($"Failed to add User. Contact not Found: Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }
            
            return CreatedAtAction(nameof(GetEmail), new { contactId, id = emailId }, emailId);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to log an email");
            throw;
        }
    }

    /// <summary>
    /// Gets an email of a contact based on the specified email ID
    /// </summary>
    /// <param name="id"></param>
    /// <param name="contactId"></param>
    /// <returns></returns>
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<EmailResponse?>> GetEmail(int contactId, int id)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var email = await _emailsService.GetEmailByIdForUserAsync(userName, contactId, id);

            if (email is null)
            {
                return NotFound($"Email Not Found: Email with ID '{id}' for Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }
            
            return Ok(email);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to get an email");
            throw;
        }
    }

    /// <summary>
    /// Gets all the emails of a contact
    /// </summary>
    /// <param name="contactId"></param>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ICollection<EmailResponse>?>> GetAllEmails(int contactId)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var response = await _emailsService.GetAllEmailsForUserAsync(userName, contactId);
            if (response is null)
            {
                return NotFound($"Failed To Get Emails. Contact not Found: Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }
            if (response.Count == 0)
            {
                return NoContent();
            }
            
            return Ok(response);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to get the emails");
            throw;
        }
    }

    /// <summary>
    /// Updates all the fields of an existing email
    /// </summary>
    /// <param name="contactId"></param>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateEmail(int contactId, [FromBody] UpdateEmailRequest request)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var isSuccess = await _emailsService.UpdateEmailForContactAsync(userName, contactId, request);

            if (!isSuccess)
            {
                return NotFound($"Email Not Found: Email with ID '{request.ContactEmailId}' for Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }

            return NoContent();
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to update the email");
            throw;
        }
    }

    /// <summary>
    /// Soft deletes an email
    /// </summary>
    /// <param name="contactId"></param>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteEmail(int contactId, int id)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var isSuccess = await _emailsService.DeleteEmailForUserAsync(userName, contactId, id);
            if (!isSuccess)
            {
                return NotFound($"Email Not Found: Email with ID '{id}' for Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }

            return NoContent();
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to delete the email");
            throw;
        }
    }
}