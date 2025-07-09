using System.ComponentModel.DataAnnotations.Schema;
using api.Data.Entities.Repositories;

namespace api.Data.Entities.Catalog
{
    [Table("Families")]
    public class Family : BaseEntite
    {
        public Designation Designation { get; set; } = new();

        [Column(TypeName = "varchar(max)")] 
        public string Description { get; set; } = string.Empty;

        public string DescriptionSource { get; set; } = string.Empty;

        public Category Category { get; set; } = new();

        [Column("GerminationMinimalTemperature", TypeName = "decimal(18,2)")]
        public decimal? GerminationMinimalTemperature { get; set; }

        [Column("GerminationOptimaleTemperature", TypeName = "decimal(18,2)")]
        public decimal? GerminationOptimaleTemperature { get; set; }

        public int? MinimalRisingTime { get; set; }
        public int? MaximumRisingTime { get; set; }

        [Column("IdealGrowingTemperature", TypeName = "decimal(18,2)")]
        public decimal? IdealGrowingTemperature { get; set; }

        [Column("ZeroVegetation", TypeName = "decimal(18,2)")]
        public decimal? ZeroVegetation { get; set; }

        public int? SunshineDuration { get; set; }

    }
}

