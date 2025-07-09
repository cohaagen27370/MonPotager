namespace api.Controllers.Calendar.dto;

public class SowingConditionsDto
{
    public int Month { get; set; }
    public StageOfLife StageSowing { get; set; }
    public StageOfLife StageHarvesting { get; set; }
    public decimal AverageTemperature { get; set; }
    public decimal MinProductTemperature { get; set; }
}