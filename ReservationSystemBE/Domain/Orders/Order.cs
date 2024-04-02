using ReservationSystem.Domain.Users;
using ReservationSystem.Shared.Entity;

namespace ReservationSystem.Domain.Orders;

public class Order : Entity
{
    public User User { get; set; }
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
    /// <summary>
    /// Identifikátor objednávky ve formátu YYYYMMDDxxx
    /// </summary>
    public string OrderIdentifikator { get; set; }

    public OrderStatus Status { get; set; }
    public string Note { get; set; }

    public void SetAcceptOrDeclineOrder(OrderAcceptanceStatus status)
    {
        switch (status)
        {
            case OrderAcceptanceStatus.Accepted:
                Status = OrderStatus.InPreparation;
                break;
            case OrderAcceptanceStatus.Declined:
                Status = OrderStatus.Canceled;
                break;
            default:
                break;
        }
    }
}

public enum OrderStatus
{
    NotStarted,
    InPreparation,
    Prepared,
    Finished,
    Canceled
}
public enum OrderAcceptanceStatus
{
    Accepted,
    Declined,
    None
}