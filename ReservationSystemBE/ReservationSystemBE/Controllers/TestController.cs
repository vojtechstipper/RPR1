using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Test;
using ReservationSystemBE.Infrastructure.Persistence;
using System.Text.Json;

namespace ReservationSystemBE.Controllers;

[ApiController]
[Route("/test")]
public class TestController : Controller
{
    private readonly IMediator _mediator;   

    public TestController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> SeedProducts()
    {     
        return Ok(await _mediator.Send(new SeedProductsCommand()));
    }
}
