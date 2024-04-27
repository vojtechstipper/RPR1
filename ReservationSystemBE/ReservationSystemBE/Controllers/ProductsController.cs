using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Shared.DTO;
using ReservationSystemBE.Application.Products.Commands.AddProductCommand;
using ReservationSystemBE.Application.Products.Commands.DeleteProductCommand;
using ReservationSystemBE.Application.Products.Commands.EditProductCommand;
using ReservationSystemBE.Application.Products.Commands.UploadImageCommand;
using ReservationSystemBE.Application.Products.GetGrouppedProducts;
using ReservationSystemBE.Application.Products.GetProductQuery;
using ReservationSystemBE.Application.Products.GetProductsQuery;

namespace ReservationSystemBE.Controllers;

[ApiController]
[Route("/product")]
[Authorize]
public class ProductsController : Controller
{
    private readonly IMediator _mediator;

    public ProductsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ProductDto>> AddProduct([FromBody] AddProductCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpPut("edit")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> EditProduct([FromBody] EditProductCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteProduct([FromRoute] string id)
    {
        return Ok(await _mediator.Send(new DeleteProductCommand(id)));
    }

    [HttpGet("list")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<PaginatedResult<ProductDto>>> GetProducts()
    {
        return Ok(await _mediator.Send(new GetPaginatedProductsQuery()));
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ProductEditDto>> GetProduct([FromRoute] string id)
    {
        return Ok(await _mediator.Send(new GetProductByIdQuery(id)));
    }

    [HttpGet("groupped")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<ProductTypeWithProductsDto>>> GetProductsGrouppedByProductType()
    {
        return Ok(await _mediator.Send(new GetGrouppedProductTypeWithProductsQuery()));
    }

    [HttpPost("image")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<string>> UploadImageForProduct(IFormFile formFile)
    {
        return Ok(await _mediator.Send(new UploadImageCommand(formFile)));
    }
}
