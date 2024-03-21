using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Orders;
using ReservationSystemBE.Infrastructure.Exceptions;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Orders.Commands;

public class ChangeOrderStepCommand : IRequest<Unit>
{
    public string OrderId { get; set; }

}

public class ChangeOrderStepCommandHandler : IRequestHandler<ChangeOrderStepCommand, Unit>
{
    private readonly ReservationSystemDbContext _context;

    public ChangeOrderStepCommandHandler(ReservationSystemDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(ChangeOrderStepCommand request, CancellationToken cancellationToken)
    {
        var order = await ValidateAndGetOrder(request.OrderId);
        if (order == null)
        {
            throw new ValidationException($"Entity not found with Id: {request.OrderId}", "EntityNotFound");
        }
        if ((int)order.Status == (int)OrderStatus.Finished) throw new ValidationException($"Cannot move order step with Id: {request.OrderId} because it is already finished", "OrderAlreadyFinished");
        if ((int)order.Status == (int)OrderStatus.Canceled) throw new ValidationException($"Cannot move order step with Id: {request.OrderId} because it is already cancelled", "OrderCancelled");

        order.Status = (OrderStatus)((int)order.Status + 1);

        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
        return Unit.Value;
    }

    private Task<Order?> ValidateAndGetOrder(string orderId)
    {
        return _context.Orders.FirstOrDefaultAsync(x => x.Id == orderId);
    }
}