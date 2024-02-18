using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.Exceptions;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Products.Commands.DeleteProductCommand;

public record DeleteProductCommand(string ProductId) : IRequest<Unit>;

public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, Unit>
{
    private readonly ReservationSystemDbContext _context;

    public DeleteProductCommandHandler(ReservationSystemDbContext context)
    {
        _context = context;
    }

    async Task<Unit> IRequestHandler<DeleteProductCommand, Unit>.Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products
             .Include(x => x.Allergens)
             .Include(x => x.PriceLevel)
             .FirstOrDefaultAsync(x => x.Id == request.ProductId);
        if (product is not null)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new ValidationException($"Entity not found with Id: {request.ProductId}", "EntityNotFound");
        }
        return Unit.Value;
    }
}
