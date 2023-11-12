using MediatR;
using ReservationSystem.Domain.Allergens;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Allergens.Commands;

public record AddAllergenCommand(string Name, string Description, int Code) : IRequest<string>;

public class AddAllergenCommandHandler : IRequestHandler<AddAllergenCommand, string>
{
    private readonly ReservationSystemDbContext _context;

    public AddAllergenCommandHandler(ReservationSystemDbContext context)
    {
        _context = context;
    }

    public async Task<string> Handle(AddAllergenCommand request, CancellationToken cancellationToken)
    {
        var allergen = new Allergen(request.Name, request.Description, request.Code);
        await _context.AddAsync(allergen);
        await _context.SaveChangesAsync();
        return allergen.Id;
    }
}

