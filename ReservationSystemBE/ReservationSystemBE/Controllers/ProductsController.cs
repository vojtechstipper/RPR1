using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Product.AddProductCommand;
using ReservationSystemBE.Application.Product.GetProductsQuery;

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
        return Ok(await _mediator.Send(command));
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<ProductDto>>> GetProducts()
    {
        return Ok(await _mediator.Send(new GetProductsQuery()));
    }
}
