using Microsoft.AspNetCore.Mvc;
using ReservationSystemBE.Application.Product.AddProductCommand;

namespace ReservationSystemBE.Controllers;

[ApiController]
[Route("product")]
public class ProductsController : Controller
{
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> AddProduct([FromBody] AddProductCommand command)
    {
        return Ok();
    }
}
