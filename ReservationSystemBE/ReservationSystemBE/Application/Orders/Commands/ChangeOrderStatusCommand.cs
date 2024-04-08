using FluentValidation;
using MailKit.Net.Smtp;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using ReservationSystem.Domain.Orders;
using ReservationSystemBE.Infrastructure.Persistence;
using SendGrid.Helpers.Mail;
using SendGrid;
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
    private readonly IConfiguration _configuration;

    public ChangeOrderStatusCommandHandler(ReservationSystemDbContext reservationSystemDbContext, IConfiguration configuration)
    {
        _reservationSystemDbContext = reservationSystemDbContext;
        _configuration = configuration;
    }

    public async Task<OrderStatusChangedDto> Handle(ChangeOrderStatusCommand request, CancellationToken cancellationToken)
    {
        var order = await _reservationSystemDbContext.Orders.Include(x=>x.User).FirstOrDefaultAsync(x => x.Id == request.OrderId);
        if (order is not null)
        {
            order.SetAcceptOrDeclineOrder(request.Status);
            _reservationSystemDbContext.Update(order);
            await _reservationSystemDbContext.SaveChangesAsync();
            //TODO provolání servicy na odeslání notifikace uživateli
            await SendEmail(order.User.Email, $"{order.User.FirstName} {order.User.SecondName}");
            return new OrderStatusChangedDto(order.Status);
        }
        else
        {
            throw new ValidationException($"Entity not found with Id: {request.OrderId}", "EntityNotFound");
        }
    }

    public async Task SendEmail(string email, string userName)
    {
        var client = new SendGridClient(_configuration["Sendgrid:ApiKey"]);
        var from = new EmailAddress("eqzvgtfskravkkwona@cazlv.com", "Bufet OSU");
        var subject = "Potvrzení objednávky";
        var to = new EmailAddress(email, userName);
        var plainTextContent = "Objednávka byla potvrzena";
        var htmlContent = "<strong>Potvrzeno</strong>";
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
    }
}
