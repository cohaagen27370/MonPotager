using api.Data.Entities.Catalog;

namespace api.Controllers.Administration.dto;

public class VariantDto
{
    public Guid Id { get; set; }
    public Guid FamilyId { get; set; }

    public string Name { get; set; } = string.Empty;
    public string? FamilyName { get; set; }

    public string Image { get; set; } = string.Empty;
    public string ImageSource { get; set; } = string.Empty;

    public string? FamilyImage { get; set; }

    public string? Description { get; set; } = string.Empty;
    public string? DescriptionSource { get; set; } = string.Empty;

    public int MaxMaturationDaysCount { get; set; }
    public int MinMaturationDaysCount { get; set; }

    public Sowing SowingMonths { get; set; } = new();
    public Sowing HarvestMonths { get; set; } = new();

    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public string? CategoryImage { get; set; }

    public decimal? GerminationMinimalTemperature { get; set; }

    public decimal? GerminationOptimaleTemperature { get; set; }

    public decimal? MinimalRisingTime { get; set; }
    public decimal? MaximumRisingTime { get; set; }
    public decimal? IdealGrowingTemperature { get; set; }

    public decimal? ZeroVegetation { get; set; }

    public int? SunshineDuration { get; set; }
}