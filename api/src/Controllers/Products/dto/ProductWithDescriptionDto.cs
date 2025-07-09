using api.Data.Entities.Catalog;

namespace api.Controllers.Products.dto;

public class ProductWithDescriptionDto
{
    public Guid Id { get; set; }

    public string FamilyName { get; set; } = string.Empty;

    public string FamilyImage { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Image { get; set; } = string.Empty;
    public string ImageSource { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string DescriptionSource { get; set; } = string.Empty;

    public int MaxMaturationDaysCount { get; set; }
    public int MinMaturationDaysCount { get; set; }

    public Sowing Seeding { get; set; } = new();

    public Sowing Harvesting { get; set; } = new();

    public decimal? GerminationMinimalTemperature { get; set; }

    public decimal? GerminationOptimaleTemperature { get; set; }

    public decimal? MinimalRisingTime { get; set; }
    public decimal? MaximumRisingTime { get; set; }
    public decimal? IdealGrowingTemperature { get; set; }

    public decimal? ZeroVegetation { get; set; }

    public int? SunshineDuration { get; set; }

}