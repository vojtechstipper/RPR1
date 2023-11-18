﻿using AutoMapper;
using ReservationSystem.Domain.Allergens;
using ReservationSystem.Domain.Products;
using ReservationSystemBE.Application.Allergens.Queries;
using ReservationSystemBE.Application.Products.GetProductsQuery;
using ReservationSystemBE.Application.ProductTypes.Queries;

namespace ReservationSystemBE.Application.Products;

public class ProductProfile:Profile
{
    public ProductProfile()
    {
        CreateMap<Product, ProductDto>();
        CreateMap<Allergen, AllergenDto>();
        CreateMap<PriceLevel, PriceLevelDto>();
        CreateMap<ProductType, ProductTypeDto>();
        CreateMap<ProductType, ProductTypeWithOrderDto>();

        CreateMap<IGrouping<ProductType, Product>, ProductTypeWithProductsDto>()
            .ForMember(dest => dest.ProductType, opt => opt.MapFrom(src => src.Key))
            .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.AsEnumerable()));
    }
}
