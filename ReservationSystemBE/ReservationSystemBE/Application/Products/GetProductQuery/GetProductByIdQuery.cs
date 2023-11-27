using MediatR;
using ReservationSystem.Shared.Exceptions;
using ReservationSystemBE.Application.Products.GetProductsQuery;
using ReservationSystemBE.Infrastructure.Exceptions;

namespace ReservationSystemBE.Application.Products.GetProductQuery;

public record GetProductByIdQuery(string Id):IRequest<ProductDto>;

public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductDto>
{
    public Task<ProductDto> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        throw new ValidationException($"Function is not impelemented", ExceptionCodes.NotImplemented);
    }
}

