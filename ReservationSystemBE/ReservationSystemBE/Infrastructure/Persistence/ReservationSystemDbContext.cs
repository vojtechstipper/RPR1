using Microsoft.EntityFrameworkCore;

namespace ReservationSystemBE.Infrastructure.Persistence
{
    public class ReservationSystemDbContext : DbContext
    {
        public ReservationSystemDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}
