using Contact.ify.Domain.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Contact.ify.Controllers;

/// <summary>
/// 
/// </summary>
[Authorize]
[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    
    private readonly IUsersService _usersService;
    private readonly ILogger<UsersController> _logger;

    /// <summary>
    /// Creates a controller with injected services.
    /// </summary>
    /// <param name="usersService"></param>
    /// <param name="logger"></param>
    /// <exception cref="ArgumentNullException"></exception>
    public UsersController(IUsersService usersService, ILogger<UsersController> logger)
    {
        _usersService = usersService ?? throw new ArgumentNullException(nameof(usersService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }
    
}