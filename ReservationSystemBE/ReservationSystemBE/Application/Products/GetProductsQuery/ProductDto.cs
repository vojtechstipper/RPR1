using ReservationSystem.Domain.Allergens;
using ReservationSystem.Domain.Products;

namespace ReservationSystemBE.Application.Products.GetProductsQuery;

public class ProductDto
{
    public string Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ProductType ProductType { get; set; }
    public List<Allergen> Allergens { get; set; } = new List<Allergen>();
    public List<PriceLevel> PriceLevels { get; set; } = new List<PriceLevel>();
}
