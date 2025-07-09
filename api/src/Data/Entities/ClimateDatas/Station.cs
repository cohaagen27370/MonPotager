using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Entities.ClimateDatas;

[Table("Stations")]
[Index(nameof(Code), IsUnique = false)]
[Index(nameof(IsDepartment), IsUnique = false)]
public class Station : BaseEntite
{
    public string InseeCode { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Tendency { get; set; } = string.Empty;

    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public int Altitude { get; set; }

    public bool IsDepartment { get; set; }

    public Climate Climate { get; set; } = new();
}
