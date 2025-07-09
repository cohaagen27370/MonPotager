using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Data.Entities.Repositories
{
    [Table("Stages")]
    public class Stage : BaseEntityRepo
    {
        public int Rank { get; set; }
        public bool IsMultiple { get; set; }

        [Required] public required Category Category { get; set; }
    }
}