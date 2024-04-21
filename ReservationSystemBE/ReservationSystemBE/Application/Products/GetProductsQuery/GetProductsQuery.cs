using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Shared.DTO;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Products.GetProductsQuery;

public class GetPaginatedProductsQuery : IRequest<PaginatedResult<ProductDto>>
{
    public int Page { get; set; } = 1;
    public int Count { get; set; } = 20;
    public string Filter { get; set; } = string.Empty;
}

public class FilterProperty
{
    public string PropertyName { get; set; }
    public SortingOrder sortingOrder { get; set; } = SortingOrder.None;
}

public enum SortingOrder
{
    Ascending,
    Descending,
    None
}

public class GetProductsQueryHandler : IRequestHandler<GetPaginatedProductsQuery, PaginatedResult<ProductDto>>
{
    private readonly ReservationSystemDbContext _dbContext;
    private readonly IMapper _mapper;

    public GetProductsQueryHandler(ReservationSystemDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<PaginatedResult<ProductDto>> Handle(GetPaginatedProductsQuery request, CancellationToken cancellationToken)
    {
        var totalCount = await _dbContext.Products.CountAsync();
        var products = await _dbContext.Products
             .Where(x => x.Name.Contains(request.Filter))
             .Include(x => x.ProductType)
             .Include(x => x.PriceLevel)
             .Include(x => x.Allergens)
        .ToListAsync();

        var productsMapped = _mapper.Map<List<ProductDto>>(products);
        return new PaginatedResult<ProductDto>() { CurrentPage = request.Page, Data = productsMapped, TotalCount = totalCount };
    }
}
