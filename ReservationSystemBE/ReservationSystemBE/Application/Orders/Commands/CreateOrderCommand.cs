using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Orders;
using ReservationSystemBE.Infrastructure.Persistence;
using ReservationSystemBE.Infrastructure.SignalRHub;
using static ReservationSystemBE.Application.Orders.Commands.CreateOrderCommand;
using ValidationException = ReservationSystemBE.Infrastructure.Exceptions.ValidationException;

namespace ReservationSystemBE.Application.Orders.Commands;

public class CreateOrderCommand : IRequest<string>
{
    public List<OrderItemsDto> Items { get; set; }
    public DateTime OrderTime { get; set; }
    public string Note { get; set; } = string.Empty;

    internal string UserEmail { get; set; }

    public class OrderItemsDto
    {
        public int Count { get; set; }
        public string ProductId { get; set; }
    }
}

public class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
{
    public CreateOrderCommandValidator()
    {
        RuleFor(x => x.Items).NotEmpty();
        RuleForEach(x => x.Items).SetValidator(new OrderItemValidator());
        RuleFor(x => x.OrderTime).NotNull();
    }

    private class OrderItemValidator : AbstractValidator<OrderItemsDto>
    {
        public OrderItemValidator()
        {
            RuleFor(x => x.ProductId).NotNull().NotEmpty();
            RuleFor(x => x.Count).GreaterThan(0);
        }
    }
}

public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, string>
{
    private readonly ReservationSystemDbContext _reservationSystemDbContext;
    private readonly IHubContext<OrderHub> _hub;

    public CreateOrderCommandHandler(ReservationSystemDbContext reservationSystemDbContext, IHubContext<OrderHub> hub)
    {
        _reservationSystemDbContext = reservationSystemDbContext;
        _hub = hub;
    }

    public async Task<string> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var products = await _reservationSystemDbContext.Products.Where(x => request.Items.Select(x => x.ProductId).ToList().Contains(x.Id)).ToListAsync();
        List<OrderItem> orderItems = new List<OrderItem>();
        foreach (var item in request.Items)
        {
            orderItems.Add(new OrderItem() { Product = products.First(x => x.Id == item.ProductId), Count = item.Count });
        }
        var user = await _reservationSystemDbContext.Users.FirstOrDefaultAsync(x => x.Email == request.UserEmail);
        if (user == null) { throw new ValidationException($"User with mail: {request.UserEmail} was not found", "UserNotFound"); }
        Random random = new Random();

        Order order = new()
        {
            UserId = user.Id,
            OrderItems = orderItems,
            DateCreated = DateTime.Now,
            DateOrdered = request.OrderTime,
            OrderIdentifikator = $"{DateTime.Now.Year}{DateTime.Now.Month}{DateTime.Now.Day}" + GenerateRandomNumberString(random, 3),
            Status = OrderStatus.NotStarted,
            Note = request.Note,
        };

        _reservationSystemDbContext.Orders.Add(order);

        await _reservationSystemDbContext.SaveChangesAsync();

        var orderItemsForMessage = orderItems.Select(x => new OrderItemDto() { ProductName = x.Product.Name, Count = x.Count }).ToList();

        await _hub.Clients.All.SendAsync("ReceivedOrder", new OrderMessage()
        {
            Id = order.Id,
            OrderItems = orderItemsForMessage,
            OrderIdentifikator = order.OrderIdentifikator,
            UserName = $"{user.FirstName} {user.SecondName}",
            UserEmail = user.Email,
            OrderedAt = order.DateCreated,
            OrderedFor = order.DateOrdered,
            OrderStatus = order.Status.ToString(),
            OrderNote = order.Note
        });

        return order.Id;
    }
    static string GenerateRandomNumberString(Random random, int length)
    {
        char[] digits = new char[length];
        for (int i = 0; i < length; i++)
        {
            digits[i] = (char)(random.Next(10) + '0');
        }

        return new string(digits);
    }
}
