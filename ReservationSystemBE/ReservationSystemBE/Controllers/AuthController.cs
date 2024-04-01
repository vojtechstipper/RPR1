using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Test;
using ReservationSystemBE.Application.Users.Commands.LoginUserCommand;
using ReservationSystemBE.Application.Users.Commands.RegisterUserCommand;

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
        return Ok(await _mediator.Send(new GetTokenCommand()));
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<LoginResponse>> LoginUser(LoginUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<LoginResponse>> RegisterUser()
    {
        return Ok(await _mediator.Send(new RegisterUserCommand()));
    }

}
