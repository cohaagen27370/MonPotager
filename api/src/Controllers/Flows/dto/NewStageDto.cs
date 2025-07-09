using System.ComponentModel;

namespace api.Controllers.Flows.dto
{

    public class NewStageDto
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
    }
}