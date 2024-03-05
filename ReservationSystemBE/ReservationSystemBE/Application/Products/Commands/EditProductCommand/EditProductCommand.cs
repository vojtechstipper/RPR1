using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Products;
using ReservationSystemBE.Application.Products.GetProductsQuery;
using ReservationSystemBE.Infrastructure.Persistence;
using ValidationException = ReservationSystemBE.Infrastructure.Exceptions.ValidationException;

namespace ReservationSystemBE.Application.Products.Commands.EditProductCommand;

public class EditProductCommand : IRequest<ProductDto>
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ProductTypeId { get; set; } = string.Empty;
    public List<string> AllergensIds { get; set; } = new List<string>();
    public PriceLevel PriceLevel { get; set; }
    public string ImageId { get; set; } = string.Empty;
}

public class EditProductCommandValidator : AbstractValidator<EditProductCommand>
{
    public EditProductCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.ProductTypeId).NotNull();
        RuleFor(x => x.PriceLevel).NotNull();
        RuleFor(x => x.PriceLevel.Name).NotNull().NotEmpty();
        RuleFor(x => x.PriceLevel.Price).GreaterThan(0);
    }
}

public class EditProductCommandHandler : IRequestHandler<EditProductCommand, ProductDto>
{
    private readonly ReservationSystemDbContext _context;
    private readonly IMapper _mapper;

    public EditProductCommandHandler(ReservationSystemDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ProductDto> Handle(EditProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.Include(x => x.Allergens).FirstOrDefaultAsync(x => x.Id == request.Id);
        var allergens = await _context.Allergens.Where(x => request.AllergensIds.Contains(x.Id)).ToListAsync();
        var productType = await _context.ProductTypes.FirstOrDefaultAsync(x => x.Id == request.ProductTypeId);
        if (productType is null)
        {
            throw new ValidationException($"Entity not found with Id: {request.ProductTypeId}", "EntityNotFound");
        }
        if (product is not null)
        {
            product.Name = request.Name;
            product.ProductTypeId = request.ProductTypeId;
            product.PriceLevel = new PriceLevel(request.PriceLevel.Name, request.PriceLevel.Price);
            product.Allergens = allergens;
            product.ImageId = request.ImageId;
            _context.Update(product);
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new ValidationException($"Entity not found with Id: {request.Id}", "EntityNotFound");
        }
        return _mapper.Map<ProductDto>(product);
    }
}
