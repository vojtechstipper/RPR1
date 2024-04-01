using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Orders.Commands;
using ReservationSystemBE.Application.Orders.Queries;
using ReservationSystemBE.Infrastructure.SignalRHub;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ReservationSystemBE.Controllers;

[ApiController]
[Route("/order")]
[Authorize]
public class OrdersController : Controller
{
    private readonly IMediator _mediator;

    public OrdersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize(Roles = "User")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<string>> CreateOrder([FromBody] CreateOrderCommand command)
    {
        var authorizationheader = HttpContext.Request.Headers["Authorization"];
        string accessToken = string.Empty;
        if (authorizationheader.ToString().StartsWith("Bearer"))
        {
            accessToken = authorizationheader.ToString().Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.ReadJwtToken(accessToken);
            var mail = jwt.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;
            command.UserEmail = mail;
        }
        return Ok(await _mediator.Send(command));
    }

    [HttpGet("not-started")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<OrderMessage>>> GetNotStartedOrders()
    {
        return Ok(await _mediator.Send(new GetNotStartedOrdersQuery()));
    }

    [HttpGet("order-times")]
    [Authorize(Roles = "User")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<OrderTimesDropdownDto>>> GetOrderTimes()
    {
        return Ok(await _mediator.Send(new GetTimesForOrderQuery()));
    }

    [HttpPost("accept")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> CreateOrder([FromBody] ChangeOrderStatusCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpPut("change-step")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> ChangeOrderStep([FromBody] ChangeOrderStepCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
}
