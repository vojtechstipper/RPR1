﻿using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Products;
using ReservationSystemBE.Application.Products.GetProductsQuery;
using ReservationSystemBE.Infrastructure.Persistence;
using ValidationException = ReservationSystemBE.Infrastructure.Exceptions.ValidationException;

namespace ReservationSystemBE.Application.Products.Commands.AddProductCommand;

public class AddProductCommand : IRequest<string>
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ProductTypeId { get; set; }
    public List<string> AllergensIds { get; set; } = new List<string>();
    public PriceLevelDto PriceLevel { get; set; }
    public string ImageId { get; set; } = string.Empty;
}

public class AddProductCommandValidator : AbstractValidator<AddProductCommand>
{
    public AddProductCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.ProductTypeId).NotNull();
        RuleFor(x => x.PriceLevel).NotNull();
        RuleFor(x => x.PriceLevel.Name).NotNull().NotEmpty();
        RuleFor(x => x.PriceLevel.Price).GreaterThan(0);
    }
}

public class AddProductCommandHandler : IRequestHandler<AddProductCommand, string>
{
    private readonly ReservationSystemDbContext _dbContext;

    public AddProductCommandHandler(ReservationSystemDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<string> Handle(AddProductCommand request, CancellationToken cancellationToken)
    {
        var allergens = await _dbContext.Allergens.Where(x => request.AllergensIds.Contains(x.Id)).ToListAsync(cancellationToken);
        var productType = await _dbContext.ProductTypes.FirstOrDefaultAsync(x => x.Id == request.ProductTypeId);

        if (productType is null)
        {
            throw new ValidationException($"Entity not found with Id: {request.ProductTypeId}", "EntityNotFound");
        }

        var product = new Product()
        {
            Allergens = allergens,
            Name = request.Name,
            Description = request.Description,
            ProductType = productType,
            PriceLevel = new PriceLevel(request.PriceLevel.Name, request.PriceLevel.Price),
            ImageId = request.ImageId
        };

        _dbContext.Products.Add(product);
        await _dbContext.SaveChangesAsync();
        return product.Id;
    }
}