namespace ReservationSystemBE.Infrastructure.SignalRHub;

public interface IOrderClient
{
    Task ReceiveOrder(OrderMessage orderMessage);
}