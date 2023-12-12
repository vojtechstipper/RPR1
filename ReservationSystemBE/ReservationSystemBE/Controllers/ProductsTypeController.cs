using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.ProductTypes.Commands;
using ReservationSystemBE.Application.ProductTypes.Queries.GetPriceTypesDropDown;

namespace ReservationSystemBE.Controllers;

[ApiController]
[Route("/productstypes")]
public class ProductsTypeController : Controller
{
    private readonly IMediator _mediator;

    public ProductsTypeController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<string>> AddProductType([FromBody] AddProductTypeCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpGet("dropdown")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<ProductTypeDto>>> GetPriceTypesDropdown()
    {
        return Ok(await _mediator.Send(new GetPriceTypesDropDownQuery()));
    }

}
