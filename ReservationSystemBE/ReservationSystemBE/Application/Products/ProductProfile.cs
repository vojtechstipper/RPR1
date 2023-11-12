using AutoMapper;
using ReservationSystem.Domain.Allergens;
using ReservationSystem.Domain.Products;
using ReservationSystemBE.Application.Allergens.Queries;
using ReservationSystemBE.Application.Products.GetProductsQuery;

namespace ReservationSystemBE.Application.Products;

public class ProductProfile:Profile
{
    public ProductProfile()
    {
        CreateMap<Product, ProductDto>();
        CreateMap<Allergen, AllergenDto>();
        CreateMap<PriceLevel, PriceLevelDto>();
        CreateMap<ProductType, ProductTypeDto>();
    }
}
