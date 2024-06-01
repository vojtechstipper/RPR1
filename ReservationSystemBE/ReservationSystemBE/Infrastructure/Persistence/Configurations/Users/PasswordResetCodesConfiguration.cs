using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReservationSystem.Domain.Users;

namespace ReservationSystemBE.Infrastructure.Persistence.Configurations.Users;

public class PasswordResetCodesConfiguration : IEntityTypeConfiguration<PasswordResetCode>
{
    public void Configure(EntityTypeBuilder<PasswordResetCode> builder)
    {
        builder.ToTable("PasswordResetCodes");
        builder.HasKey(x => x.Id);



        builder.HasOne(x => x.User)
            .WithMany(x => x.PasswordResetCodes)
            .HasForeignKey(x => x.UserId);
    }
}