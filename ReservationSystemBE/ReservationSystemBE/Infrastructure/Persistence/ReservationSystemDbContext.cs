using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Allergens;
using ReservationSystem.Domain.Orders;
using ReservationSystem.Domain.Products;

namespace ReservationSystemBE.Infrastructure.Persistence;

public class ReservationSystemDbContext : DbContext
{
    public DbSet<Allergen> Allergens => Set<Allergen>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductType> ProductTypes => Set<ProductType>();
    public DbSet<PriceLevel> PriceLevels => Set<PriceLevel>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();


    public ReservationSystemDbContext(DbContextOptions options) : base(options)
    {
    }
}

