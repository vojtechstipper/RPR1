﻿namespace ReservationSystemBE.Application.Test;

public class SeedDtos
{
    public class PriceLevelSeedDto
    {
        public string Name { get; set; }
        public double Price { get; set; }
    }

    public class ProductSeedDto
    {
        public string Name { get; set; }
        public List<PriceLevelSeedDto> PriceLevels { get; set; }
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
}
