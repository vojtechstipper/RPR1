using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReservationSystem.Domain.Products;

namespace ReservationSystemBE.Infrastructure.Persistence.Configurations.Products;

public class PriceLevelConfiguration : IEntityTypeConfiguration<PriceLevel>
{
    public void Configure(EntityTypeBuilder<PriceLevel> builder)
    {
        builder.ToTable("PriceLevels");
        builder.HasKey(x => x.Id);
    }
}
