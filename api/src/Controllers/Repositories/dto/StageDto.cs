using System.ComponentModel;

namespace api.Controllers.Repositories.dto
{

    public class StageDto
    {
        public int Id { get; set; }
        public string Label { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public int Rank { get; set; }
    }
}