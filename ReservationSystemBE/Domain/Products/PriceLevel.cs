using ReservationSystem.Shared.Entity;

namespace ReservationSystem.Domain.Products;

public class PriceLevel : Entity
{
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
}
