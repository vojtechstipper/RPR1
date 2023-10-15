using ReservationSystem.Domain.Products;

namespace ReservationSystemBE.Application.Product.AddProductCommand;

public class AddProductCommand
{
    public string Name { get; set; } = string.Empty;
    public string ProductTypeId { get; set; }
    public List<string> AllergensIds { get; set; } = new List<string>();
    public List<PriceLevel> PriceLevels { get; set; } = new List<PriceLevel>();
}

public class AddProductCommandHandler
{

}