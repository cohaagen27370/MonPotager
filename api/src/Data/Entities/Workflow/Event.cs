using System.ComponentModel.DataAnnotations.Schema;
using api.Data.Entities.Repositories;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Entities.Workflow
{
    [Table("Events")]
    [Index(nameof(Date), IsUnique = false)]
    public class Event : BaseEntite
    {
        public DateOnly Date { get; set; }
        public required Stage Stage { get; set; }
        public Flow? Flow { get; set; }
    }
}