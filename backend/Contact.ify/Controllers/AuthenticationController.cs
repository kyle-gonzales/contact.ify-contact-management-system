using Contact.ify.Domain.DTOs;
using Contact.ify.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Contact.ify.Controllers;

[ApiController]
[Route("api/authentication")]
public class AuthenticationController : ControllerBase
{
    private readonly IUsersService _usersService;

    public AuthenticationController(IUsersService usersService)
    {
        _usersService = usersService ?? throw new ArgumentNullException(nameof(usersService));
    }

    [HttpPost]
    [Route("/register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest request)
    {
        var isSuccess = await _usersService.RegisterUserAsync(request);

        if (isSuccess)
        {
            return Ok();
        }

        return BadRequest("Something went wrong when trying to register your account");
    }

    [HttpPost]
    [Route("/login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginUserRequest request)
    {
        var token = await _usersService.LoginUserAsync(request);

        if (token == null)
        {
            return BadRequest("Something went wrong when trying to log in");
        }
        return Ok(token);
    }
}

