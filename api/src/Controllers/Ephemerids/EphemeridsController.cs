using api.Attributes;
using api.Controllers.Ephemerids.dto;
using api.Data;
using api.Data.Dto;
using api.Extensions;
using api.Helpers;
using Innovative.SolarCalculator;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("/v{version:apiVersion}")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class EphemeridsController(ILogger<EphemeridsController> logger, GardenContext context) : ControllerBase
    {
        private readonly ILogger<EphemeridsController> _logger = logger;

        private readonly GardenContext _gardenContext = context;

        /// <summary>
        /// get the ephemerids of the day
        /// </summary>
        /// <returns>Ephemerids</returns>
        [UserAuthorized]
        [HttpGet("ephemerids", Name = "GetEphemerids")]
        [ProducesResponseType(typeof(EphemeridsDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetEphemerids()
        {
            var userId = HttpContext.Me();

            var user = _gardenContext.Users.Include(x => x.Station).ThenInclude(x => x.Climate).SingleOrDefault(x => x.Id == userId);
            if (user == null)
            {
                return NotFound("User is not found");
            }

            var current = Constantes.SaintDays.Single(x => x.Day == DateTime.Now.Day && x.Month == DateTime.Now.Month);
            var (sunRise, sunSet, deltaDuration) = ComputeSunRiseAndSet(user.Station.Latitude, user.Station.Longitude);

            var ephemerids = new EphemeridsDto()
            {
                Date = DateOnly.FromDateTime(DateTime.Now),
                CurrentDate = DateTime.Now.ToLongDateString(),
                SaintName = current.Saint,
                Saying = current.Saying,
                SunData = new SunDataDto()
                {
                    CurrentSeason = GetSeason(DateTime.Now),
                    DeltaDuration = deltaDuration,
                    SunRise = sunRise.ToShortTimeString(),
                    SunSet = sunSet.ToShortTimeString()
                },
                MoonPhase = Moon.Now(),
                Station = new StationDto()
                {
                    ClimatName = user.Station.Climate.Label,
                    ClimatImage = user.Station.Climate.Image,
                    CodeDepartment = user.Station.Code,
                    StationName = user.Station.Name,
                    ClimatComment = user.Station.Climate.Comment,
                    InseeCode = user.Station.InseeCode
                }
            };

            return Ok(ephemerids);
        }

        private static (DateTime sunRise, DateTime sunSet, string deltaDuration) ComputeSunRiseAndSet(double latitude, double longitude)
        {
            var solarTimes = new SolarTimes(DateTime.Now, latitude, longitude);
            var solarTimesYesterday = new SolarTimes(DateTime.Now.AddDays(-1), latitude, longitude);

            return (solarTimes.Sunrise, solarTimes.Sunset, (solarTimes.SunlightDuration - solarTimesYesterday.SunlightDuration).TotalMinutes.ToString());
        }

        private static string GetSeason(DateTime date)
        {
            var lastYearIsLeap = DateTime.IsLeapYear(date.Year - 1);
            var thisIsLeap = DateTime.IsLeapYear(date.Year);
            var nextYearIsLeap = DateTime.IsLeapYear(date.Year + 1);

            var summerStart = 6.21f;
            var autumnStart = 9.23f;
            var winterStart = 12.21f;

            //check if we need summer adjustment
            if (thisIsLeap)
            {
                summerStart = 6.20f;
            }
            //check if we need autumn adjustment
            if (thisIsLeap || lastYearIsLeap)
            {
                autumnStart = 9.22f;
            }
            //check if we need winter adjustment
            if (nextYearIsLeap)
            {
                winterStart = 12.22f;
            }

            if (date.Year == 2034 || date.Year == 2038)
                autumnStart -= 0.01f;

            var value = (float)date.Month + date.Day / 100f;   // <month>.<day(2 digit)>
            if (value < 3.20 || value >= winterStart) return "Winter";   // Winter
            if (value < summerStart) return "Spring"; // Spring
            return value < autumnStart ? "Summer" : // Summer
                "Autumn"; // Autumn
        }
    }
}
