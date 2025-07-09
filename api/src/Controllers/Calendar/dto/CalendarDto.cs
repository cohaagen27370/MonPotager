namespace api.Controllers.Calendar.dto;

public class CalendarDto
{
    public Guid VariantId { get; set; }
    public string Variant { get; set; } = string.Empty;
    public decimal MinGerminationTemperature { get; set; }
    public List<ScenarioDto> Scenario { get; set; } = [];
}