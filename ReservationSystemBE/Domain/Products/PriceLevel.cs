using ReservationSystem.Shared.Entity;

namespace ReservationSystem.Domain.Products;

public class PriceLevel : Entity
{
    public PriceLevel()
    {
    }

    public PriceLevel(string name, decimal price)
    {
        Name = name;
        Price = price;
    }

    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
}
