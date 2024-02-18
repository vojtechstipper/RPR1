using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Products.GetProductsQuery;

public record GetProductsQuery : IRequest<List<ProductDto>>;

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, List<ProductDto>>
{
    private readonly ReservationSystemDbContext _dbContext;
    private readonly IMapper _mapper;

    public GetProductsQueryHandler(ReservationSystemDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<List<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await _dbContext.Products
             .Include(x => x.ProductType)
             .Include(x => x.PriceLevel)
             .Include(x => x.Allergens)
            .ToListAsync();

        var idk = _mapper.Map<List<ProductDto>>(products);
        return idk ?? new List<ProductDto>();
    }
}