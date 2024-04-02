using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Orders;
using ReservationSystemBE.Infrastructure.Persistence;
using ReservationSystemBE.Infrastructure.SignalRHub;

namespace ReservationSystemBE.Application.Orders.Queries;

public record GetNotStartedOrdersQuery : IRequest<List<OrderMessage>>;

public class GetNotStartedOrdersQueryHandler : IRequestHandler<GetNotStartedOrdersQuery, List<OrderMessage>>
{
    private readonly ReservationSystemDbContext _reservationSystemDbContext;

    public GetNotStartedOrdersQueryHandler(ReservationSystemDbContext reservationSystemDbContext)
    {
        _reservationSystemDbContext = reservationSystemDbContext;
    }

    public async Task<List<OrderMessage>> Handle(GetNotStartedOrdersQuery request, CancellationToken cancellationToken)
    {
        var orders = await _reservationSystemDbContext.Orders
            .Include(x => x.OrderItems)
            .ThenInclude(x => x.Product)
            .Where(x => x.Status != OrderStatus.Finished && x.Status != OrderStatus.Canceled)
            .Select(x => new OrderMessage()
            {
                Id = x.Id,
                OrderItems = x.OrderItems.Select(y => new OrderItemDto() { Count = y.Count, ProductName = y.Product.Name }).ToList(),
                OrderIdentifikator = x.OrderIdentifikator,
                UserName = "Petr Novák",
                UserEmail = "petr.novak@gmail.com",
                OrderedAt = x.DateCreated,
                OrderedFor = x.DateOrdered,
                OrderStatus = x.Status,
                OrderNote = x.Note
            }).ToListAsync();

        return orders;
    }
}
