using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Product.AddProductCommand;

namespace ReservationSystemBE.Controllers;

[ApiController]
[Route("/product")]
public class ProductsController : Controller
{
    private readonly IMediator _mediator;

    public ProductsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> AddProduct([FromBody] AddProductCommand command)
    {
        return Ok(_mediator.Send(command));
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> GetProducts()
    {
        return Ok();
    }
}
