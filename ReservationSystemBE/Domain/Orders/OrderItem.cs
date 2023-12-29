using ReservationSystem.Domain.Products;
using ReservationSystem.Shared.Entity;

namespace ReservationSystem.Domain.Orders;

public class OrderItem : Entity
{
    public int Count { get; set; }
    public string OrderId { get; set; }
    public Order Order { get; set; }
    public string ProductId { get; set; }
    public Product Product { get; set; }

}
