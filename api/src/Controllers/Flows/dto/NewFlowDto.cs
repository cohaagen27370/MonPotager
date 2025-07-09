using System.ComponentModel;

namespace api.Controllers.Flows.dto
{

    public class NewFlowDto
    {
        public Guid VariantId { get; set; } = Guid.Empty;
        public required int StartStageId { get; set; }
        public required DateOnly StartDate { get; set; }
    }
}