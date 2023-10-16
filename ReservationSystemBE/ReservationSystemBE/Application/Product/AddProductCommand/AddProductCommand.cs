using MediatR;
using ReservationSystem.Domain.Allergens;
using ReservationSystem.Domain.Products;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Product.AddProductCommand;

public class AddProductCommand : IRequest<string>
{
    public string Name { get; set; } = string.Empty;
    public string ProductTypeId { get; set; }
    public List<string> AllergensIds { get; set; } = new List<string>();
    public List<PriceLevel> PriceLevels { get; set; } = new List<PriceLevel>();
}

public class AddProductCommandHandler : IRequestHandler<AddProductCommand, string>
{
    private readonly ReservationSystemDbContext _dbContext;

    public AddProductCommandHandler(ReservationSystemDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<string> Handle(AddProductCommand request, CancellationToken cancellationToken)
    {
        //jen na seedování prozatimní
        Allergen allergen = new()
        {
            Code = 1,
            Description = "Může obsahovat ořechy",
            Name = "Ořechy",
        };
        ProductType productType = new() { Name = "Specialitky" };
        ReservationSystem.Domain.Products.Product product = new()
        {
            Allergens = new List<Allergen>() { allergen },
            Name = "Houska",
            ProductType = productType,
            PriceLevels = new List<PriceLevel>() { new PriceLevel() { Name = "Normální", Price = 50 } }
        };
        _dbContext.Products.Add(product);
        await _dbContext.SaveChangesAsync();
        return product.Id;
    }
}