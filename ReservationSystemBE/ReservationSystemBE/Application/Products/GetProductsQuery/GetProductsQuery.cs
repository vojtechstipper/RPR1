﻿using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Shared.DTO;
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

    public async Task<PaginatedResult<ProductDto>> Handle(GetPaginatedProductsQuery request, CancellationToken cancellationToken)
    {
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
                case "producttype":
                    if (request.DescendingOrder is not null && request.DescendingOrder == true)
                    {
                        productsQuery = productsQuery.OrderByDescending(x => x.ProductType.Name);
                    }
                    else productsQuery = productsQuery.OrderBy(x => x.ProductType.Name);
                    break;
                case "price":
                    if (request.DescendingOrder is not null && request.DescendingOrder == true)
                    {
                        productsQuery = productsQuery.OrderByDescending(x => x.PriceLevel.Price);
                    }
                    else productsQuery = productsQuery.OrderBy(x => x.PriceLevel.Price);
                    break;
            }
        }
        var totalCount = await productsQuery.CountAsync();
        productsQuery = productsQuery.Skip((request.Page - 1) * request.Count).Take(request.Count);
        var productsMapped = _mapper.Map<List<ProductDto>>(await productsQuery.ToListAsync());
        return new PaginatedResult<ProductDto>() { CurrentPage = request.Page, Data = productsMapped, TotalCount = totalCount };
    }
}