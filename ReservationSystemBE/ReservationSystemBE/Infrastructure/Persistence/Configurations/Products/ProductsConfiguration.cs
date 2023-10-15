using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReservationSystem.Domain.Products;

namespace ReservationSystemBE.Infrastructure.Persistence.Configurations.Products;

public class ProductsConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");
        builder.HasKey(x => x.Id);

        builder.HasMany(x => x.Allergens)
            .WithMany(x => x.Products);

        builder.HasMany(x => x.PriceLevels);

        builder.HasOne(x => x.ProductType)
            .WithMany(x => x.Products)
            .HasForeignKey(x => x.ProductTypeId);
    }
}
