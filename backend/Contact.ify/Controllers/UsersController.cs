using Contact.ify.Domain.DTOs.Users;
using Contact.ify.Domain.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Contact.ify.Controllers;

/// <summary>
/// Controller for working with users
/// </summary>
[Authorize]
[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    
    private readonly IUsersService _usersService;
    private readonly ILogger<UsersController> _logger;

    /// <summary>
    /// Injects a logger and users service
    /// </summary>
    /// <param name="usersService"></param>
    /// <param name="logger"></param>
    /// <exception cref="ArgumentNullException"></exception>
    public UsersController(IUsersService usersService, ILogger<UsersController> logger)
    {
        _usersService = usersService ?? throw new ArgumentNullException(nameof(usersService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    
    /// <summary>
    /// Gets a user based on the username from the identity claims
    /// </summary>
    /// <returns></returns>
    /// <response code="200">Successfully returns the user</response>
    /// <response code="400">Missing fields or invalid values</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="404">User not found based on the username</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserResponse>> GetUser()
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var response = await _usersService.GetUserAsync(userName);
            if (response is null)
            {
                return NotFound($"User not Found: User '{userName}' does not exist");
            }
            
            return Ok(response);
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong trying to get a user");
            throw;
        }
    }
    
    /// <summary>
    /// Updates all the fields of a user obtained from the username from the identity claims
    /// </summary>
    /// <returns></returns>
    /// <response code="204">Successfully updated the user's first name, last name, and email</response>
    /// <response code="400">Missing fields or invalid values</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="404">User not found based on the username</response>
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateUser(UpdateUserRequest request)
    {
        try
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized("Missing claims");
            }

            var isSuccess = await _usersService.UpdateUserAsync(userName, request);
            if (!isSuccess)
            {
                return NotFound($"User not Found: User '{userName}' does not exist");
            }
            
            return NoContent();
        }
        catch (Exception)
        {
            _logger.LogError("Something went wrong when trying to update a user");
            throw;
        }
    }

    // /// <summary>
    // /// 
    // /// </summary>
    // /// <returns></returns>
    // [HttpDelete]
    // [ProducesResponseType(StatusCodes.Status204NoContent)]
    // [ProducesResponseType(StatusCodes.Status400BadRequest)]
    // [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    // [ProducesResponseType(StatusCodes.Status404NotFound)]
    // public async Task<IActionResult> DeleteUser() //TODO: add update user DTO body parameter
    // {
    //     try
    //     {
    //         return NoContent();
    //     }
    //     catch (Exception e)
    //     {
    //         Console.WriteLine(e);
    //         throw;
    //     }
    // }
}