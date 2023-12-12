namespace ReservationSystemBE.Application.ProductTypes.Queries.GetPriceTypesDropDown;

public class ProductTypeDto
{
    public ProductTypeDto(string id, string name)
    {
        Id = id;
        Name = name;
    }

    public string Id { get; set; }
    public string Name { get; set; }
    
}
