using System.ComponentModel;
using api.Controllers.Products.dto;
using api.Controllers.Repositories.dto;

namespace api.Controllers.Flows.dto
{

    public class FlowDetailDto
    {
        public ProductWithVarietyDto Product { get; set; } = new();

        public bool IsClosed { get; set; }
        public int Year { get; set; }
        public double NumberOfDaysSinceStart { get; set; }
        public StageDto CurrentStage { get; set; } = new();
        public List<EventDto> Events { get; set; } = [];
    }
}