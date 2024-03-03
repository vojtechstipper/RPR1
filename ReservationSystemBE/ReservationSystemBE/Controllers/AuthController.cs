using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Allergens.Queries;

namespace ReservationSystemBE.Controllers;

[ApiController]
[AllowAnonymous]
[Route("/auth")]
public class AuthController : Controller
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("token")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<string>> GetToken()
    {
        return Ok(await _mediator.Send(new GetAllergensQuery()));
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> LoginUser()
    {
        return Ok(await _mediator.Send(new GetAllergensQuery()));
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> RegisterUser()
    {
        return Ok(await _mediator.Send(new GetAllergensQuery()));
    }

}
