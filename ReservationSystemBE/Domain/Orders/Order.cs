using ReservationSystem.Shared.Entity;

namespace ReservationSystem.Domain.Orders;

public class Order : Entity
{
    public string UserId { get; set; }
    /// <summary>
    /// Kdy byla objednávka uskutečněna
    /// </summary>
    public DateTime DateCreated { get; set; }
    /// <summary>
    /// Na kdy bylo objednáno
    /// </summary>
    public DateTime DateOrdered { get; set; }
    public List<OrderItem> OrderItems { get; set; }
}
