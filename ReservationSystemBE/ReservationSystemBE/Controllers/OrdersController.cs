using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Orders.Commands;
using ReservationSystemBE.Application.Products.Commands.AddProductCommand;
using ReservationSystemBE.Application.Products.GetProductsQuery;

namespace ReservationSystemBE.Controllers;

[ApiController]
[Route("/order")]
public class OrdersController : Controller
{
    private readonly IMediator _mediator;

    public OrdersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    //TODO potřeba zajistit ověření pomocí tokenu na přihlášeného uživatele
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> CreateOrder([FromBody] CreateOrderCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
}
