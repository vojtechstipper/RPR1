using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Users.Commands.RegisterUserCommand;

namespace ReservationSystemBE.Controllers;

[ApiController]
[Route("/users")]
[Authorize]
public class UsersController : Controller
{
    private readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<string>> RegisterUser([FromBody] RegisterUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
}
