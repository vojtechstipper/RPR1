using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReservationSystem.Domain.Allergens;

namespace ReservationSystemBE.Infrastructure.Persistence.Configurations.Allergens;

public class AllergenConfiguration : IEntityTypeConfiguration<Allergen>
{
    public void Configure(EntityTypeBuilder<Allergen> builder)
    {
        builder.ToTable("Allergens");
        builder.HasKey(x => x.Id);

    }
}
