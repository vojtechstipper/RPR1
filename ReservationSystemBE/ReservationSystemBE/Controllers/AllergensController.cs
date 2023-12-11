using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Allergens.Commands;
using ReservationSystemBE.Application.Allergens.Queries;

namespace ReservationSystemBE.Controllers;

[ApiController]
[Route("/allergen")]
public class AllergensController : Controller
{
    private readonly IMediator _mediator;

    public AllergensController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<AllergenDto>>> GetAllergensList()
    {
        return Ok(await _mediator.Send(new GetAllergensQuery()));
    }

    [HttpGet("dropdown")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<AllergenDropDownDto>>> GetAllergensDropdown()
    {
        return Ok(await _mediator.Send(new GetAllergensDropDownQuery()));
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<string>> AddAllergen([FromBody] AddAllergenCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
}
