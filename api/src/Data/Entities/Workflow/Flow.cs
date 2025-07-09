using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Data.Entities.Auth;
using api.Data.Entities.Catalog;
using api.Data.Entities.Repositories;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Entities.Workflow
{
    [Table("Flows")]
    [Index(nameof(IsClosed), IsUnique = false)]
    public class Flow : BaseEntite
    {
        [Required] public Variant Variant { get; set; } = new();

        [ForeignKey("CurrentStageId")]
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public required Stage CurrentStage { get; set; }

        [Required] public required List<Event> Events { get; set; } = [];

        public bool IsClosed { get; set; }

        [Required] public int Year { get; set; }

        public int NumberOfDaysSinceStart { get; set; }
        public User User { get; set; } = new();
    }
}