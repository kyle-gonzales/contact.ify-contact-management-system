using Contact.ify.Domain.Services.Emails;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Contact.ify.Controllers;

[Authorize]
[ApiController]
[Route("api/contacts/{contactId:int}/emails")]
public class EmailsController : ControllerBase
{
    private readonly ILogger<EmailsController> _logger;
    private readonly IEmailsService _emailsService;

    public EmailsController(ILogger<EmailsController> logger, IEmailsService emailsService)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _emailsService = emailsService ?? throw new ArgumentNullException(nameof(emailsService));
    }
    
    
}