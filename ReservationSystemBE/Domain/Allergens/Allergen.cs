using ReservationSystem.Domain.Products;
using ReservationSystem.Shared.Entity;

namespace ReservationSystem.Domain.Allergens;

public class Allergen : Entity
{

    public string Name { get; set; }
    public string Description { get; set; }
    public int Code { get; set; }
    public List<Product> Products { get; set; } = new List<Product>();
    public Allergen()
    {
    }

    public Allergen(string name, string description, int code)
    {
        Name = name;
        Description = description;
        Code = code;
    }
}
