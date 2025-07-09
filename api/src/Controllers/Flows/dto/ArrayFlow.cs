using System.ComponentModel;

namespace api.Controllers.Flows.dto
{

    public class ArrayFlowDto
    {

        public required int PageSize { get; set; }
        public required int PageNumber { get; set; }
        public required int Count { get; set; }

        public double PageCount
        {
            get
            {
                return Math.Ceiling(Count * 1.0 / (PageSize * 1.0));
            }
        }

        public required List<FlowDto> Datas { get; set; } = [];

    }
}