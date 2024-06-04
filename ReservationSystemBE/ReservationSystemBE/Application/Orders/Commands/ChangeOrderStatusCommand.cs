using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Orders;
using ReservationSystem.Shared.DTO;
using ReservationSystemBE.Application.Services;
using ReservationSystemBE.Infrastructure.Persistence;
using ValidationException = ReservationSystemBE.Infrastructure.Exceptions.ValidationException;

namespace ReservationSystemBE.Application.Orders.Commands;

public class ChangeOrderStatusCommand : IRequest<OrderStatusChangedDto>
{
    public string OrderId { get; set; }
    public OrderAcceptanceStatus Status { get; set; } = OrderAcceptanceStatus.None;
}

public class ChangeOrderStatusCommandValidator : AbstractValidator<ChangeOrderStatusCommand>
{
    public ChangeOrderStatusCommandValidator()
    {
        RuleFor(x => x.OrderId).NotEmpty();
    }
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
    private readonly IEmailNotifier _notifier;

    public ChangeOrderStatusCommandHandler(ReservationSystemDbContext reservationSystemDbContext, IEmailNotifier notifier)
    {
        _reservationSystemDbContext = reservationSystemDbContext;
        _notifier = notifier;
    }

    public async Task<OrderStatusChangedDto> Handle(ChangeOrderStatusCommand request, CancellationToken cancellationToken)
    {
        var order = await _reservationSystemDbContext.Orders
            .Include(x => x.User)
            .Include(x => x.OrderItems)
            .ThenInclude(x => x.Product)
            .ThenInclude(x => x.PriceLevel)
            .FirstOrDefaultAsync(x => x.Id == request.OrderId);

        if (order is not null)
        {
            order.SetAcceptOrDeclineOrder(request.Status);
            _reservationSystemDbContext.Update(order);
            await _reservationSystemDbContext.SaveChangesAsync();

            var orderMailData = new TemplateMailData()
            {
                UserName = $"{order.User.FirstName} {order.User.SecondName}",
                OrderTime = $"{order.DateOrdered.ToString("mm:ss:ff")}",
                OrderNumber = order.OrderIdentifikator,
                OrderItems = order.OrderItems.Select(x => new ReservationSystem.Shared.DTO.OrderItem()
                {
                    ProductName = x.Product.Name,
                    ProductPrice = x.Product.PriceLevel.Price,
                    ProductQuantity = x.Count,
                    ProductTotal = x.Product.PriceLevel.Price * x.Count
                }).ToList(),
                
            };

            await _notifier.SendEmail(order.User.Email, $"{order.User.FirstName} {order.User.SecondName}", order.Status, orderMailData);
            return new OrderStatusChangedDto(order.Status);
        }
        else
        {
            throw new ValidationException($"Entity not found with Id: {request.OrderId}", "EntityNotFound");
        }
    }
}
