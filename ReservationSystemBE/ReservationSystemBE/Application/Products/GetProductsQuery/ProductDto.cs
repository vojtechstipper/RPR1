using ReservationSystemBE.Application.Allergens.Queries;

namespace ReservationSystemBE.Application.Products.GetProductsQuery;

public class ProductDto
{
    public string Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ProductTypeDto ProductType { get; set; }
    public List<AllergenDto> Allergens { get; set; } = new List<AllergenDto>();
    public PriceLevelDto PriceLevel { get; set; } 
    public string ImageId { get; set; } 
}

public class ProductTypeDto
{
    public string Name { get; set; } = string.Empty;
}

public class PriceLevelDto
{
    public PriceLevelDto(string name, decimal price)
    {
        Name = name;
        Price = price;
    }

    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
}