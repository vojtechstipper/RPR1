using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Product.GetProductsQuery;

public record GetProductsQuery : IRequest<List<ProductDto>>;

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, List<ProductDto>>
{
    private readonly ReservationSystemDbContext _dbContext;

    public GetProductsQueryHandler(ReservationSystemDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await _dbContext.Products
             .Include(x => x.ProductType)
             .Include(x => x.PriceLevels)
             .Include(x => x.Allergens)
             .Select(x => new ProductDto()
             {
                 Allergens = x.Allergens,
                 Id = x.Id,
                 Name = x.Name,
                 PriceLevels = x.PriceLevels,
                 ProductType = x.ProductType,
             }).ToListAsync();

        return products ?? new List<ProductDto>();
    }
}