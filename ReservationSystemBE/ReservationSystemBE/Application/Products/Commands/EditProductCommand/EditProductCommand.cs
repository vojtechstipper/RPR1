﻿using AutoMapper;
using MediatR;
using ReservationSystem.Domain.Products;
using ReservationSystemBE.Application.Products.GetProductsQuery;
using ReservationSystemBE.Infrastructure.Exceptions;
using ReservationSystemBE.Infrastructure.Persistence;

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
    private readonly ReservationSystemDbContext _context;
    private readonly IMapper _mapper;

    public EditProductCommandHandler(ReservationSystemDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ProductDto> Handle(EditProductCommand request, CancellationToken cancellationToken)
    {
        var product = _context.Products.FirstOrDefault(x => x.Id == request.Id);
        if (product is not null)
        {
            product.Name = request.Name;
            product.ProductTypeId = request.ProductTypeId;
            product.PriceLevels = request.PriceLevels;
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
