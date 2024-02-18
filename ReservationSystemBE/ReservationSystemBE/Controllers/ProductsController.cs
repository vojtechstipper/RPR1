using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Products.Commands.AddProductCommand;
using ReservationSystemBE.Application.Products.Commands.DeleteProductCommand;
using ReservationSystemBE.Application.Products.Commands.EditProductCommand;
using ReservationSystemBE.Application.Products.GetGrouppedProducts;
using ReservationSystemBE.Application.Products.GetProductQuery;
using ReservationSystemBE.Application.Products.GetProductsQuery;

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

    [HttpPut("edit")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> EditProduct([FromBody] EditProductCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteProduct([FromRoute] string id)
    {
        return Ok(await _mediator.Send(new DeleteProductCommand(id)));
    }

    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<ProductDto>>> GetProducts()
    {
        return Ok(await _mediator.Send(new GetProductsQuery()));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ProductEditDto>> GetProduct([FromRoute] string id)
    {
        return Ok(await _mediator.Send(new GetProductByIdQuery(id)));
    }

    [HttpGet("groupped")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<ProductTypeWithProductsDto>>> GetProductsGrouppedByProductType()
    {
        return Ok(await _mediator.Send(new GetGrouppedProductTypeWithProductsQuery()));
    }
}
