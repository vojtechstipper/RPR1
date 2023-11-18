using ReservationSystem.Domain.Products;
using ReservationSystemBE.Application.Products.GetProductsQuery;

namespace ReservationSystemBE.Application.ProductTypes.Queries;

public class ProductTypeWithProductsDto
{
    public ProductTypeWithOrderDto ProductType { get; set; }
    public List<ProductDto> Products { get; set; } = new List<ProductDto>();
}
