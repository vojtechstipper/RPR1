using MediatR;
using ReservationSystem.Domain.Products;
using ReservationSystemBE.Infrastructure.Persistence;
using static ReservationSystemBE.Application.Test.SeedDtos;
using System.Text.Json;
using ReservationSystem.Domain.Allergens;

namespace ReservationSystemBE.Application.Test;

public record SeedAllergensCommand() : IRequest<Unit>;

public class SeedAllergensCommandHandler : IRequestHandler<SeedAllergensCommand, Unit>
{
    private readonly String fileName = "AllergenSeed.json";
    private readonly ReservationSystemDbContext _context;

    public SeedAllergensCommandHandler(ReservationSystemDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(SeedAllergensCommand request, CancellationToken cancellationToken)
    {
        string jsonString = File.ReadAllText(Path.Combine(fileName));
        SeedObjectAllergens seed = JsonSerializer.Deserialize<SeedObjectAllergens>(jsonString)!;

        if (seed != null && seed.Allergens != null)
        {
            List<Allergen> allergensList = seed.Allergens.Select(a => new Allergen
            {
                Name = a.Name,
                Description = a.Description,
                Code = a.Code
            }).ToList();

            await _context.Allergens.AddRangeAsync(allergensList);
        }


        await _context.SaveChangesAsync();
        return Unit.Value;
    }
}

