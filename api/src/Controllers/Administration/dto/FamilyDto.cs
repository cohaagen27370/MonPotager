using System;

namespace api.Controllers.Administration.dto;

public class FamilyDto
{
    public Guid? Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string ImageSource { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    public string DescriptionSource { get; set; } = string.Empty;

    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public string? CategoryImage { get; set; }

    public decimal? GerminationMinimalTemperature { get; set; }

    public decimal? GerminationOptimaleTemperature { get; set; }

    public int? MinimalRisingTime { get; set; }
    public int? MaximumRisingTime { get; set; }
    public decimal? IdealGrowingTemperature { get; set; }

    public decimal? ZeroVegetation { get; set; }
    public int? SunshineDuration { get; set; }
}
