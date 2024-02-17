using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Shared.Exceptions;
using ReservationSystemBE.Application.Products.GetProductsQuery;
using ReservationSystemBE.Infrastructure.Exceptions;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Products.GetProductQuery;

public record GetProductByIdQuery(string Id) : IRequest<ProductEditDto>;

public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductEditDto>
{
    private readonly ReservationSystemDbContext _dbContext;
    private readonly IMapper _mapper;

    public GetProductByIdQueryHandler(ReservationSystemDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<ProductEditDto> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _dbContext.Products
              .Include(x => x.ProductType)
              .Include(x => x.PriceLevel)
              .Include(x => x.Allergens)
             .FirstOrDefaultAsync(x => x.Id == request.Id);

        if (product is null)
            throw new ValidationException($"Product with Id: {request.Id} was not found", ExceptionCodes.EntityNotFound);

        var productDto = _mapper.Map<ProductEditDto>(product);
        return productDto;
    }
}

