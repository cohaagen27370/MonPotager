using System.ComponentModel.DataAnnotations.Schema;

namespace api.Data.Entities.Catalog
{
    [Table("Searches")]
    public class Search : BaseEntite
    {
        public Designation SearchDesignation { get; set; } = new();
        public int SearchCount { get; set; }
    }
}