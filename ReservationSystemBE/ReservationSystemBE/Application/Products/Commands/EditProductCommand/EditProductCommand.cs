using MediatR;
using ReservationSystem.Domain.Products;
using ReservationSystemBE.Application.Products.GetProductsQuery;

namespace ReservationSystemBE.Application.Products.Commands.EditProductCommand;

public class EditProductCommand : IRequest<ProductDto>
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string ProductTypeId { get; set; } = string.Empty;
    public List<string> AllergensIds { get; set; } = new List<string>();
    public List<PriceLevel> PriceLevels { get; set; } = new List<PriceLevel>();
}

public class EditProductCommandHandler : IRequestHandler<EditProductCommand, ProductDto>
{
    public Task<ProductDto> Handle(EditProductCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
