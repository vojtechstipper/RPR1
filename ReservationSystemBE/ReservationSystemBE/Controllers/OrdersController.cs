using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Orders.Commands;
using ReservationSystemBE.Application.Orders.Queries;
using ReservationSystemBE.Infrastructure.SignalRHub;

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
    [Authorize(Roles = "Customer")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> CreateOrder([FromBody] CreateOrderCommand command)
    {
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
    [Authorize(Roles = "Customer")]
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
}
