namespace ReservationSystem.Shared.DTO;

public class TemplateMailData
{
    public string UserName { get; set; }
    public string OrderNumber { get; set; }
    public string OrderTime { get; set; }
    public List<OrderItem> OrderItems { get; set; }
    public decimal TotalPrice  => OrderItems.Sum(x => x.ProductTotal);

}

public class OrderItem
{
    public string ProductName { get; set; }
    public int ProductQuantity { get; set; }
    public decimal ProductPrice { get; set; }
    public decimal ProductTotal { get; set; }
}