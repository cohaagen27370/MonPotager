using System.ComponentModel;

namespace api.Controllers.Ephemerids.dto
{
    public class SunDataDto
    {
        public string CurrentSeason { get; set; } = string.Empty;

        public string SunRise { get; set; } = string.Empty;

        public string SunSet { get; set; } = string.Empty;
        public string DeltaDuration { get; set; } = string.Empty;

        public string SunDuration => (DateTime.Parse(SunSet) - DateTime.Parse(SunRise)).ToString();
    }
}
