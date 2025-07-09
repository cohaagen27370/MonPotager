using System;

namespace api.Controllers.Repositories.dto;

public class ForecastStationDto
{
    public Guid Id { get; set;}
    public string CodeDepartement { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string ClimateName { get; set; } = string.Empty;
}
