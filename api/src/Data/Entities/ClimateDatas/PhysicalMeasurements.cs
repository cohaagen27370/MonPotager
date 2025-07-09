using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Entities.ClimateDatas;

[Table("PhysicalMeasurements")]
[Index(nameof(Month), IsUnique = false)]
public class PhysicalMeasurements : BaseEntite
{
    public int Month { get; set; }

    [Column("MaxTemperature", TypeName = "decimal(18,2)")]
    public decimal MaxTemperature { get; set; }

    [Column("MinTemperature", TypeName = "decimal(18,2)")]
    public decimal MinTemperature { get; set; }

    [Column("AverageTemperature", TypeName = "decimal(18,2)")]
    public decimal AverageTemperature { get; set; }

    public required Station Station { get; set; }

}
