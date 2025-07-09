using System.ComponentModel;
using api.Controllers.Products.dto;
using api.Controllers.Repositories.dto;

namespace api.Controllers.Flows.dto
{

    public class FlowDto
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid VariantId { get; set; } = Guid.Empty;
        public required string Name { get; set; } = string.Empty;
        public required string Variety { get; set; } = string.Empty;
        public required string Image { get; set; } = string.Empty;
        public required CategoryDto Category { get; set; }
        public required StageDto StartStage { get; set; }
        public required DateOnly StartDate { get; set; }
        public DateOnly? ExpectedHarvestDate { get; set; }
        public bool ExpiredHarvestDate { get; set; }
    }
}