using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Shared.DTO;
using ReservationSystemBE.Application.Users.Commands;
using ReservationSystemBE.Application.Users.Commands.ChangePasswordCommand;
using ReservationSystemBE.Application.Users.Commands.EditUserCommand;
using ReservationSystemBE.Application.Users.Commands.RegisterUserCommand;
using ReservationSystemBE.Application.Users.Queries;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

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

    [HttpGet]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<PaginatedResult<UserDto>>> GetUsers([FromQuery] PaginatedUsersQuery query)
    {
        return Ok(await _mediator.Send(query));
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<UserDto>> GetUserById([FromRoute] string id)
    {
        return Ok(await _mediator.Send(new GetUserByIdQuery(id)));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<UserDto>> DeactivateUserById([FromRoute] string id)
    {
        return Ok(await _mediator.Send(new DeactivateUserByIdCommand(id)));
    }

    [HttpPut("edit")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<PaginatedResult<UserDto>>> EditUser([FromBody] EditUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpPut("password")]
    [Authorize(Roles = "User, Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<string>> ChangePassword([FromBody] ChangePasswordCommand command)
    {
        var authorizationheader = HttpContext.Request.Headers["Authorization"];
        string accessToken = string.Empty;
        if (authorizationheader.ToString().StartsWith("Bearer"))
        {
            accessToken = authorizationheader.ToString().Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.ReadJwtToken(accessToken);
            var userId = jwt.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
            command.UserId = userId;
        }
        return Ok(await _mediator.Send(command));
    }
}
