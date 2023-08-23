using Contact.ify.Domain.Services.PhoneNumbers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Contact.ify.Controllers;

[Authorize]
[ApiController]
[Route("api/contacts/{contactId:int}/phoneNumbers")]
public class PhoneNumbersController : ControllerBase
{
    private readonly ILogger<PhoneNumbersController> _logger;
    private readonly IPhoneNumbersService _phoneNumbersService;
    

    public PhoneNumbersController(ILogger<PhoneNumbersController> logger, IPhoneNumbersService phoneNumbersService)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _phoneNumbersService = phoneNumbersService ?? throw new ArgumentNullException(nameof(phoneNumbersService));
    }
}