using MediatR;
using ReservationSystem.Domain.Products;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.ProductTypes.Commands;

public class AddProductTypeCommand : IRequest<string>
{
    public string Name { get; set; }
}

public class AddProductTypeCommandHandler : IRequestHandler<AddProductTypeCommand, string>
{
    private readonly ReservationSystemDbContext _context;

    public AddProductTypeCommandHandler(ReservationSystemDbContext context)
    {
        _context = context;
    }

    public async Task<string> Handle(AddProductTypeCommand request, CancellationToken cancellationToken)
    {
        ProductType productType = new() { Name = request.Name };
        await _context.ProductTypes.AddAsync(productType);
        await _context.SaveChangesAsync();
        return productType.Id;
    }
}
