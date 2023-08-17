using Contact.ify.Domain.DTOs;
using Contact.ify.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Contact.ify.Controllers;

[ApiController]
[Route("api/authentication")]
public class AuthenticationController : ControllerBase
{
    private readonly IUsersService _usersService;
    private readonly ILogger<AuthenticationController> _logger;

    public AuthenticationController(IUsersService usersService, ILogger<AuthenticationController> logger)
    {
        _usersService = usersService ?? throw new ArgumentNullException(nameof(usersService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpPost]
    [Route("/register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest request)
    {
        try
        {
            var isSuccess = await _usersService.RegisterUserAsync(request);
            if (isSuccess)
            {
                return Ok();
            }

            return BadRequest("Something went wrong when trying to register your account");
        }
        catch (OperationCanceledException e)
        {
            _logger.LogError(e, "Database operation was cancelled");
            return StatusCode(StatusCodes.Status500InternalServerError, "The database provider is currently unavailable.");
        }
        catch (Exception)
        {
            _logger.LogError("Exception occurred when trying to register a user");
            throw;
        }
    }

    [HttpPost]
    [Route("/login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginUserRequest request)
    {
        try
        {
            var token = await _usersService.LoginUserAsync(request);

            if (token == null)
            {
                return BadRequest("Something went wrong when trying to log in");
            }
            return Ok(token);
        }
        catch (OperationCanceledException e)
        {
            _logger.LogError(e, "Database operation was cancelled");
            return StatusCode(StatusCodes.Status500InternalServerError, "The database provider is currently unavailable.");
        }
        catch (Exception)
        {
            _logger.LogError("Exception occurred when trying to login");
            throw;
        }
    }
}

