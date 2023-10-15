using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReservationSystem.Domain.Products;

namespace ReservationSystemBE.Infrastructure.Persistence.Configurations.Products;

public class ProductTypesConfiguration : IEntityTypeConfiguration<ProductType>
{
    public void Configure(EntityTypeBuilder<ProductType> builder)
    {
        builder.ToTable("ProductTypes");
        builder.HasKey(x => x.Id);
    }
}
