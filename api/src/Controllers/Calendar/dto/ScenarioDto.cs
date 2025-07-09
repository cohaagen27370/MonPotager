namespace api.Controllers.Calendar.dto;

public class ScenarioDto
{
    public int SeedingMonth { get; set; }
    public int HarvestMonth { get; set; }
    public int MaturationDayCount { get; set; }

    public decimal MinGerminationTemperature { get; set; }
    public decimal AverageStationTemperature { get; set; }

    public bool StartUnderCover { get; set; }
}