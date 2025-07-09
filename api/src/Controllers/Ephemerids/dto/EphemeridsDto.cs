using System;
using System.ComponentModel;
using static api.Helpers.Moon;

namespace api.Controllers.Ephemerids.dto
{

    public class EphemeridsDto
    {
        public DateOnly Date { get; set; }
        public required string CurrentDate { get; set; } = string.Empty;

        public required string SaintName { get; set; } = string.Empty;

        public string Saying { get; set; } = string.Empty;

        public required PhaseResult MoonPhase { get; set; } = null!;

        public required SunDataDto SunData { get; set; } = new();
        public required StationDto Station { get; set; } = new();
    }
}
