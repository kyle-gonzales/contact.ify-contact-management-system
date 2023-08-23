using Contact.ify.Domain.DTOs.Addresses;
using Contact.ify.Domain.Services.Addresses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Contact.ify.Controllers;

/// <summary>
/// 
/// </summary>
[Authorize]
[ApiController]
[Route("api/contacts/{contactId:int}/addresses")]
public class AddressesController : ControllerBase
{
    private readonly ILogger<AddressesController> _logger;
    private readonly IAddressesService _addressesService;

    /// <summary>
    /// 
    /// </summary>
    /// <param name="logger"></param>
    /// <param name="addressesService"></param>
    /// <exception cref="ArgumentNullException"></exception>
    public AddressesController(ILogger<AddressesController> logger, IAddressesService addressesService)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _addressesService = addressesService ?? throw new ArgumentNullException(nameof(addressesService));
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
    public async Task<ActionResult<int>> CreateAddress(int contactId, [FromBody] CreateAddressRequest request)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }
            var addressId = await _addressesService.AddAddressForContactAsync(userName, contactId, request);

            if (addressId is null)
            {
                return NotFound($"Failed to add User. Contact not Found: Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }
            
            return CreatedAtAction(nameof(GetAddress), new { contactId, id = addressId }, addressId);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to log an address");
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
    public async Task<ActionResult<AddressResponse?>> GetAddress(int contactId, int id)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var address = await _addressesService.GetAddressByIdForUserAsync(userName, contactId, id);

            if (address is null)
            {
                return NotFound($"Address Not Found: Address with ID '{id}' for Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }
            
            return Ok(address);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to get an address");
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
    public async Task<ActionResult<ICollection<AddressResponse>?>> GetAllAddresses(int contactId)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var response = await _addressesService.GetAllAddressesForUserAsync(userName, contactId);
            if (response is null)
            {
                return NotFound($"Failed To Get Addresses. Contact not Found: Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }
            if (response.Count == 0)
            {
                return NoContent();
            }
            
            return Ok(response);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to get the addresses");
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
    public async Task<IActionResult> UpdateAddress(int contactId, [FromBody] UpdateAddressRequest request)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var isSuccess = await _addressesService.UpdateAddressForContactAsync(userName, contactId, request);

            if (!isSuccess)
            {
                return NotFound($"Address Not Found: Address with ID '{request.ContactAddressId}' for Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }

            return NoContent();
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to update the address");
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
    public async Task<IActionResult> DeleteAddress(int contactId, int id)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var isSuccess = await _addressesService.DeleteAddressForUserAsync(userName, contactId, id);
            if (!isSuccess)
            {
                return NotFound($"Address Not Found: Address with ID '{id}' for Contact ID '{contactId}' belonging to User '{userName}' does not exist");
            }

            return NoContent();
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to delete the address");
            throw;
        }
    }
}