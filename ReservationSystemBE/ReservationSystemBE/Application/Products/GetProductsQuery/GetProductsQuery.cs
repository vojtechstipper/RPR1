using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Products.GetProductsQuery;

public class GetPaginatedProductsQuery : PaginationFiltering, IRequest<PaginatedResult<ProductDto>>
{ }



public class GetProductsQueryHandler : IRequestHandler<GetPaginatedProductsQuery, PaginatedResult<ProductDto>>
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
        var totalCount = await _dbContext.Products.CountAsync();
        var productsQuery = _dbContext.Products
             .Include(x => x.ProductType)
             .Include(x => x.PriceLevel)
             .Include(x => x.Allergens).AsQueryable();

        if (!string.IsNullOrEmpty(request.Filter))
        {
            productsQuery = productsQuery.Where(x => x.Name.Contains(request.Filter));
        }

        if (!string.IsNullOrEmpty(request.OrderBy))
        {
            switch (request.OrderBy.Trim().ToLower())
            {
                case "name":
                    if (request.DescendingOrder is not null && request.DescendingOrder == true)
                    {
                        productsQuery = productsQuery.OrderByDescending(x => x.Name);
                    }
                    else productsQuery = productsQuery.OrderBy(x => x.Name);
                    break;
            }
        }

        productsQuery = productsQuery.Skip((request.Page - 1) * request.Count).Take(request.Count);
        var productsMapped = _mapper.Map<List<ProductDto>>(await productsQuery.ToListAsync());
        return new PaginatedResult<ProductDto>() { CurrentPage = request.Page, Data = productsMapped, TotalCount = totalCount };
    }
}