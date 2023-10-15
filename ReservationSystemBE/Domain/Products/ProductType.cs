using ReservationSystem.Shared.Entity;

namespace ReservationSystem.Domain.Products;

public class ProductType : Entity
{
    public string Name { get; set; } = string.Empty;
    public List<Product> Products { get; set; } = new List<Product>();
}