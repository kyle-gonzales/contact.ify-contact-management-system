using Contact.ify.Domain.DTOs.Users;
using Contact.ify.Domain.Services.Users;
using Microsoft.AspNetCore.Mvc;

namespace Contact.ify.Controllers;

/// <summary>
/// Authenticates a user using JWT and Bearer Tokenization Authentication Scheme
/// </summary>
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IUsersService _usersService;
    private readonly ILogger<AuthenticationController> _logger;

    /// <summary>
    /// Creates a controller with injected services.
    /// </summary>
    /// <param name="usersService"></param>
    /// <param name="logger"></param>
    public AuthenticationController(IUsersService usersService, ILogger<AuthenticationController> logger)
    {
        _usersService = usersService ?? throw new ArgumentNullException(nameof(usersService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    /// <summary>
    /// Register a new account
    /// </summary>
    /// <param name="request">Request containing registration info</param>
    /// <returns>IActionResult</returns>
    /// <response code="200">Successful Registration</response>
    /// <response code="400">Missing field or invalid values</response>
    /// <response code="409">User already exists</response>
    [HttpPost("api/register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest request)
    {
        try
        {
            var isSuccess = await _usersService.RegisterUserAsync(request);
            if (isSuccess)
            {
                return Ok();
            }

            return Conflict(new { errors = new Dictionary<string, object[]>{{ "UserName" , new object[]{"User already exists"}}}});
        }
        catch (Exception)
        {
            _logger.LogError("Exception occurred when trying to register a user");
            throw;
        }
    }

    /// <summary>
    /// Login to an existing account
    /// </summary>
    /// <param name="request">Request containing login info</param>
    /// <returns></returns>
    /// <response code="200">Returns a JWT token</response>
    /// <response code="400">Missing field or invalid values</response>
    /// <response code="401">Incorrect username or password</response>
    [HttpPost("/api/login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<string>> Login([FromBody] LoginUserRequest request)
    {
        try
        {
            var token = await _usersService.LoginUserAsync(request);

            if (token == null)
            {
                return Unauthorized("Your username or password is incorrect. Please check your login credentials.");
            }
            return Ok(token);
        }
        catch (Exception)
        {
            _logger.LogError("Exception occurred when trying to login");
            throw;
        }
    }
}

