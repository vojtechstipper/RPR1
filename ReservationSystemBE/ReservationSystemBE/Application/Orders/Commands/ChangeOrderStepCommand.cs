using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Orders;
using ReservationSystemBE.Application.Services;
using ReservationSystemBE.Infrastructure.Exceptions;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Orders.Commands;

public class ChangeOrderStepCommand : IRequest<Unit>
{
    public string OrderId { get; set; }
    public OrderStatus Status { get; set; }

}

public class ChangeOrderStepCommandHandler : IRequestHandler<ChangeOrderStepCommand, Unit>
{
    private readonly ReservationSystemDbContext _context;
    private readonly IEmailNotifier _notifier;

    public ChangeOrderStepCommandHandler(ReservationSystemDbContext context, IEmailNotifier notifier)
    {
        _context = context;
        _notifier = notifier;
    }

    public async Task<Unit> Handle(ChangeOrderStepCommand request, CancellationToken cancellationToken)
    {
        var order = await ValidateAndGetOrder(request.OrderId);
        if (order == null)
        {
            throw new ValidationException($"Entity not found with Id: {request.OrderId}", "EntityNotFound");
        }

        ValidateStepChange(request.Status, order.Status);

        order.Status = request.Status;

        _context.Orders.Update(order);
        await _context.SaveChangesAsync();

        if (order.Status == OrderStatus.InPreparation || order.Status == OrderStatus.Canceled)
        {
            await _notifier.SendEmail(order.User.Email, $"{order.User.FirstName} {order.User.SecondName}", order.Status,null);
        }
        return Unit.Value;
    }

    private void ValidateStepChange(OrderStatus nextStatus, OrderStatus currentStatus)
    {
        var allowedStatusForNotStarted = new OrderStatus[] { OrderStatus.Canceled, OrderStatus.InPreparation };
        var allowedStatusForInPreparation = new OrderStatus[] { OrderStatus.Canceled, OrderStatus.Prepared, OrderStatus.InPreparation };
        var allowedStatusForPrepared = new OrderStatus[] { OrderStatus.Canceled, OrderStatus.Finished };
        var allowedStatusForFinished = new OrderStatus[] { OrderStatus.Canceled };

        switch (currentStatus)
        {
            case OrderStatus.NotStarted:
                if (!allowedStatusForNotStarted.Contains(nextStatus))
                {
                    throw new ValidationException($"Cannot move from step: {currentStatus} to {nextStatus}", "OrderStatusChangeNotAllowed");
                }
                break;
            case OrderStatus.InPreparation:
                if (!allowedStatusForInPreparation.Contains(nextStatus))
                {
                    throw new ValidationException($"Cannot move from step: {currentStatus} to {nextStatus}", "OrderStatusChangeNotAllowed");
                }
                break;
            case OrderStatus.Prepared:
                if (!allowedStatusForPrepared.Contains(nextStatus))
                {
                    throw new ValidationException($"Cannot move from step: {currentStatus} to {nextStatus}", "OrderStatusChangeNotAllowed");
                }
                break;
            case OrderStatus.Finished:
                if (!allowedStatusForFinished.Contains(nextStatus))
                {
                    throw new ValidationException($"Cannot move from step: {currentStatus} to {nextStatus}", "OrderStatusChangeNotAllowed");
                }
                break;
            case OrderStatus.Canceled:
                throw new ValidationException($"Order is already Cancelled", "BadOrderStatus");
            default:
                throw new ValidationException($"Not Defined step {currentStatus}", "OrderStatusChangeNotAllowed");
        }
    }

    private Task<Order?> ValidateAndGetOrder(string orderId)
    {
        return _context.Orders.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == orderId);
    }
}