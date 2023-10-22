using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Products.Commands.AddProductCommand;
using ReservationSystemBE.Application.Products.Commands.EditProductCommand;
using ReservationSystemBE.Application.Products.GetProductQuery;
using ReservationSystemBE.Application.Products.GetProductsQuery;
using static System.Net.Mime.MediaTypeNames;

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
    public async Task<ActionResult<ProductDto>> AddProduct([FromBody] AddProductCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpPut("{id}/edit")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ProductDto>> EditProduct([FromBody] EditProductCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<ProductDto>>> GetProducts()
    {
        return Ok(await _mediator.Send(new GetProductsQuery()));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ProductDto>> GetProduct([FromRoute] string id)
    {
        return Ok(await _mediator.Send(new GetProductByIdQuery(id)));
    }
}
