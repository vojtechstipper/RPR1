namespace ReservationSystemBE.Application.Test;

public class SeedDtos
{
    public class SeedDto
    {
        public string Name { get; set; }
        public double Price { get; set; }
    }

    public class ProductSeedDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public SeedDto PriceLevel{ get; set; }
        public List<int>? AllergenCodes { get; set; }
    }

    public class ProductTypeSeedDto
    {
        public List<ProductSeedDto> Products { get; set; }
        public string ProductType { get; set; }
    }

    public class SeedObject
    {
        public List<ProductTypeSeedDto> Items { get; set; }
    }

    public class AllergensDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Code { get; set; }
    }

    public class SeedObjectAllergens
    {
        public List<AllergensDto> Allergens { get; set; }
    }
}
