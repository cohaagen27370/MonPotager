using System.ComponentModel.DataAnnotations.Schema;

namespace api.Data.Entities.Catalog;

[Table("Variants")]
public class Variant : BaseEntite
{
    public Designation Designation { get; set; } = new();

    public Sowing SowingMonths { get; set; } = new();
    public Sowing HarvestMonths { get; set; } = new();

    public int MinMaturationDaysCount { get; set; }
    public int MaxMaturationDaysCount { get; set; }

    public Family Family { get; set; } = new();
}