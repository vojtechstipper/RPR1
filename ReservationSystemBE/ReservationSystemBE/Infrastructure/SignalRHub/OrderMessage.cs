using ReservationSystem.Domain.Orders;

namespace ReservationSystemBE.Infrastructure.SignalRHub;

public class OrderMessage
{
    public string Name { get; set; } = string.Empty;
    public string Id { get; set; } = string.Empty;
    public List<OrderItemDto> OrderItems { get; set; }
    public DateTime OrderedAt { get; set; }
    public DateTime OrderedFor { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string UserEmail { get; set; } = string.Empty;
    public string OrderIdentifikator { get; set; } = string.Empty;
    public OrderStatus OrderStatus { get; set; }
}

public class OrderItemDto
{
    public string ProductName { get; set; } = string.Empty;
    public int Count { get; set; }
}
