using ReservationSystem.Shared.Entity;

namespace ReservationSystem.Domain.Products;

public class ProductType : Entity
{
    public ProductType()
    {
    }

    public ProductType(string name, List<Product> products)
    {
        Name = name;
        Products = products;
    }

    public string Name { get; set; } = string.Empty;
    public List<Product> Products { get; set; } = new List<Product>();
}