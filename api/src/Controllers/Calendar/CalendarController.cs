using api.Attributes;
using api.Controllers.Calendar.dto;
using api.Data;
using api.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers.Calendar;

[ApiController]
[Authorize]
[Route("/v{version:apiVersion}")]
[Produces("application/json")]
[Consumes("application/json")]
public class CalendarController(ILogger<CalendarController> logger, GardenContext context) : ControllerBase
{
    private readonly GardenContext _gardenContext = context;
    private readonly ILogger<CalendarController> _logger = logger;

    /// <summary>
    ///     Get seeding calendar
    /// </summary>
    /// <returns>List of messages</returns>
    [UserAuthorized]
    [HttpGet("calendar", Name = "GetCalendar")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(List<CalendarDto>), StatusCodes.Status200OK)]
    public IActionResult GetCalendar()
    {
        var userId = HttpContext.Me();

        var calendars = new List<CalendarDto>();

        var myStation = _gardenContext.Users.Include(x => x.Station).FirstOrDefault(x => x.Id == userId)
            ?.Station;

        if (myStation != null)
        {
            var allMyPlants = _gardenContext.Flows
                .Include(x => x.Variant)
                .ThenInclude(x => x.Family)
                .Include(x => x.User)
                .Where(x => x.User.Id == userId)
                .Select(x => x.Variant)
                .ToList();

            if (allMyPlants.Count != 0)
            {
                var measure = _gardenContext.PhysicalMeasurements.Include(x => x.Station)
                    .Where(x => x.Station.Id == myStation.Id)
                    .ToList();

                foreach (var plant in allMyPlants)
                {
                    var calendar = new CalendarDto
                    {
                        Variant = plant.Family.Designation.Name + " " + plant.Designation.Name,
                        VariantId = plant.Id,
                        MinGerminationTemperature = plant.Family.GerminationMinimalTemperature!.Value,
                        Scenario = []
                    };

                    for (var month = 1; month <= 12; month++)
                    {
                        // Get the average and min temperature of the month
                        var seendingMeasures = measure.First(x => x.Month == month);

                        var harvestMonth = new DateTime(DateTime.Now.Year, month, 1)
                            .AddDays(plant.MinMaturationDaysCount)
                            .Month;

                        var hypotheticHarvestMeasures =
                            measure.First(x => x.Month == harvestMonth);

                        if (seendingMeasures.AverageTemperature >= plant.Family.GerminationMinimalTemperature &&
                            hypotheticHarvestMeasures.AverageTemperature >= plant.Family.ZeroVegetation)
                            calendar.Scenario.Add(new ScenarioDto
                            {
                                SeedingMonth = month,
                                HarvestMonth = harvestMonth,
                                MaturationDayCount = plant.MinMaturationDaysCount,
                                StartUnderCover = false,
                                MinGerminationTemperature = plant.Family.GerminationMinimalTemperature.Value,
                                AverageStationTemperature = seendingMeasures.AverageTemperature
                            });
                        else
                            calendar.Scenario.Add(new ScenarioDto
                            {
                                SeedingMonth = month,
                                HarvestMonth = harvestMonth,
                                MaturationDayCount = plant.MaxMaturationDaysCount,
                                StartUnderCover = true,
                                MinGerminationTemperature = plant.Family.GerminationMinimalTemperature.Value,
                                AverageStationTemperature = seendingMeasures.AverageTemperature
                            });
                    }

                    calendars.Add(calendar);
                }
            }

            return Ok(calendars);
        }

        return NotFound("COMPUTING CONDITIONS ARE NOT FOUND");
    }
}