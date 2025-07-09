using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using api.Controllers.Repositories.dto;

namespace api.Controllers.Flows.dto
{
    public class EventDto
    {
        public Guid Id { get; set; }
        public StageDto Stage { get; set; } = new();
        public DateOnly Date { get; set; }
    }
}