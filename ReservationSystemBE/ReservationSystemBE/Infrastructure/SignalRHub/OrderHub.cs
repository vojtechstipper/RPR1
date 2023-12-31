using Microsoft.AspNetCore.SignalR;

namespace ReservationSystemBE.Infrastructure.SignalRHub;

public class OrderHub : Hub<IOrderClient>
{
    public async Task SendMessage(OrderMessage message)
    {
        await Clients.All.ReceiveOrder(message);
    }
}
