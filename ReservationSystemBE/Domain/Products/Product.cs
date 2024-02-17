using ReservationSystem.Domain.Allergens;
using ReservationSystem.Shared.Entity;

namespace ReservationSystem.Domain.Products;

public class Product : Entity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ProductType ProductType { get; set; }
    public string ProductTypeId { get; set; }
    public List<Allergen> Allergens { get; set; } = new List<Allergen>();
    public PriceLevel PriceLevel { get; set; }
}
