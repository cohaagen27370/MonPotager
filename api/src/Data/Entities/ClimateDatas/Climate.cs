using System.ComponentModel.DataAnnotations.Schema;

namespace api.Data.Entities.ClimateDatas;

[Table("Climates")]
public class Climate : BaseEntityRepo
{
    public string Comment { get; set; } = string.Empty;
}
