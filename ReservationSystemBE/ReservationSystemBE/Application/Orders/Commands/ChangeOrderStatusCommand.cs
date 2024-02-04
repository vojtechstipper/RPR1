using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Orders;
using ReservationSystemBE.Infrastructure.Exceptions;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Orders.Commands;

public class ChangeOrderStatusCommand : IRequest<OrderStatusChangedDto>
{
    public string OrderId { get; set; } = string.Empty;
    public OrderAcceptanceStatus Status { get; set; } = OrderAcceptanceStatus.None;
}

public class OrderStatusChangedDto
{
    public OrderStatusChangedDto(OrderStatus status)
    {
        Status = status;
    }

    public OrderStatus Status { get; set; }
}



public class ChangeOrderStatusCommandHandler : IRequestHandler<ChangeOrderStatusCommand, OrderStatusChangedDto>
{
    private readonly ReservationSystemDbContext _reservationSystemDbContext;

    public ChangeOrderStatusCommandHandler(ReservationSystemDbContext reservationSystemDbContext)
    {
        _reservationSystemDbContext = reservationSystemDbContext;
    }

    public async Task<OrderStatusChangedDto> Handle(ChangeOrderStatusCommand request, CancellationToken cancellationToken)
    {
        var order = await _reservationSystemDbContext.Orders.FirstOrDefaultAsync(x => x.Id == request.OrderId);
        if (order is not null)
        {
            order.SetAcceptOrDeclineOrder(request.Status);
            _reservationSystemDbContext.Update(order);
            await _reservationSystemDbContext.SaveChangesAsync();
            //TODO provolání servicy na odeslání notifikace uživateli
            return new OrderStatusChangedDto(order.Status);
        }
        else
        {
            throw new ValidationException($"Entity not found with Id: {request.OrderId}", "EntityNotFound");
        }
    }
}
