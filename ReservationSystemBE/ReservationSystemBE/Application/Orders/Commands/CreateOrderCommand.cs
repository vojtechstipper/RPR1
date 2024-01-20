using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Orders;
using ReservationSystemBE.Infrastructure.Persistence;
using ReservationSystemBE.Infrastructure.SignalRHub;

namespace ReservationSystemBE.Application.Orders.Commands;

public class CreateOrderCommand : IRequest<Unit>
{
    public List<OrderItemsDto> Items { get; set; }
    public DateTime OrderTime { get; set; }
    public string Note { get; set; } = string.Empty;

    public class OrderItemsDto
    {
        public int Count { get; set; }
        public string ProductId { get; set; }
    }
}

public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Unit>
{
    private readonly ReservationSystemDbContext _reservationSystemDbContext;
    private readonly IHubContext<OrderHub> _hub;

    public CreateOrderCommandHandler(ReservationSystemDbContext reservationSystemDbContext, IHubContext<OrderHub> hub)
    {
        _reservationSystemDbContext = reservationSystemDbContext;
        _hub = hub;
    }

    public async Task<Unit> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var products = await _reservationSystemDbContext.Products.Where(x => request.Items.Select(x => x.ProductId).ToList().Contains(x.Id)).ToListAsync();
        List<OrderItem> orderItems = new List<OrderItem>();
        foreach (var item in request.Items)
        {
            orderItems.Add(new OrderItem() { Product = products.First(x => x.Id == item.ProductId), Count = item.Count });
        }

        Order order = new()
        {
            UserId = "tempUserId",
            OrderItems = orderItems,
            DateCreated = DateTime.Now,
            DateOrdered = request.OrderTime,
            OrderIdentifikator = "20240112001",
            Status = OrderStatus.NotStarted,
            Note = request.Note,
        };

        _reservationSystemDbContext.Orders.Add(order);

        await _reservationSystemDbContext.SaveChangesAsync();

        var orderItemsForMessage = orderItems.Select(x => new OrderItemDto() { ProductName = x.Product.Name, Count = x.Count }).ToList();

        //TODO provolání servicy, která pošle event
        await _hub.Clients.All.SendAsync("ReceivedOrder", new OrderMessage()
        {
            Id = order.Id,
            OrderItems = orderItemsForMessage,
            OrderIdentifikator = order.OrderIdentifikator,
            UserName = "Petr Novák",
            UserEmail = "petr.novak@gmail.com",
            OrderedAt = order.DateCreated,
            OrderedFor = order.DateOrdered,
            OrderStatus = order.Status,
            OrderNote = order.Note
        });

        return Unit.Value;
    }
}
