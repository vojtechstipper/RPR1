using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.ProductTypes.Queries;

public record GetGrouppedProductTypeWithProductsQuery : IRequest<List<ProductTypeWithProductsDto>>;


public class GetGrouppedProductTypeWithProductsQueryHandler : IRequestHandler<GetGrouppedProductTypeWithProductsQuery, List<ProductTypeWithProductsDto>>
{
    private readonly ReservationSystemDbContext _context;
    private readonly IMapper _mapper;

    public GetGrouppedProductTypeWithProductsQueryHandler(ReservationSystemDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ProductTypeWithProductsDto>> Handle(GetGrouppedProductTypeWithProductsQuery request, CancellationToken cancellationToken)
    {
        var query = await _context.Products
            .Include(x => x.ProductType)
            .Include(x => x.Allergens)
            .Include(x => x.PriceLevels)
            .GroupBy(x => x.ProductType)
            .ToListAsync();

        return _mapper.Map<List<ProductTypeWithProductsDto>>(query);
    }
}
