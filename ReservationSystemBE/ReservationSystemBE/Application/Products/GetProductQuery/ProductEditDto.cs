
using ReservationSystemBE.Application.Products.GetProductsQuery;

namespace ReservationSystemBE.Application.Products.GetProductQuery;

public class ProductEditDto
{
    public string Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ProductTypeId { get; set; } = string.Empty;
    public List<string> AllergensIds { get; set; } = new List<string>();
    public List<PriceLevelDto> PriceLevels { get; set; } = new List<PriceLevelDto>();
}
