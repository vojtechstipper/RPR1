﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Products;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Products.Commands.AddProductCommand;

public class AddProductCommand : IRequest<string>
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ProductTypeId { get; set; }
    public List<string> AllergensIds { get; set; } = new List<string>();
    public List<PriceLevel> PriceLevels { get; set; } = new List<PriceLevel>();
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

        var product = new Product()
        {
            Allergens = allergens,
            Name = request.Name,
            Description= request.Description,
            ProductType = productType,
            PriceLevels = request.PriceLevels
        };

        _dbContext.Products.Add(product);
        await _dbContext.SaveChangesAsync();
        return product.Id;
    }
}