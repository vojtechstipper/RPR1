namespace ReservationSystemBE.Application.ProductTypes.Queries;

public class ProductTypeWithOrderDto
{
    public string Name { get; set; } = string.Empty;
    public string Id { get; set; } = string.Empty;
    public int Order { get; set; }
}
