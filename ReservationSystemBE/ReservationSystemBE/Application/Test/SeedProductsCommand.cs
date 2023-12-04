using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Allergens;
using ReservationSystem.Domain.Products;
using ReservationSystemBE.Infrastructure.Persistence;
using System.Text.Json;
using static ReservationSystemBE.Application.Test.SeedDtos;

namespace ReservationSystemBE.Application.Test;

public record SeedProductsCommand() : IRequest<Unit>;

public class SeedProductsCommandHandler : IRequestHandler<SeedProductsCommand, Unit>
{
    private readonly ReservationSystemDbContext _context;

    public SeedProductsCommandHandler(ReservationSystemDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(SeedProductsCommand request, CancellationToken cancellationToken)
    {
        string fileName = "ProductSeed.json";
        string jsonString = File.ReadAllText(Path.Combine(fileName));
        SeedObject seed = JsonSerializer.Deserialize<SeedObject>(jsonString)!;


        var allergens = await _context.Allergens.ToListAsync();

        var productTypesToInsert = seed.Items
            .Where(item => item.Products.Any())
            .Select(item => new ProductType(
                item.ProductType,
                item.Products.Select(it => new Product
                {
                    Name = it.Name,
                    Description = it.Description,
                    PriceLevels = it.PriceLevels
                    .Select(pl => new PriceLevel(pl.Name, (decimal)pl.Price))
                    .ToList(),
                    Allergens = it.AllergenCodes != null ? allergens.Where(x => it.AllergenCodes.Contains(x.Code)).ToList() : new List<Allergen>()
                }).ToList()
                ))
            .ToList();

        await _context.ProductTypes.AddRangeAsync(productTypesToInsert);

        await _context.SaveChangesAsync();
        return Unit.Value;
    }
}

