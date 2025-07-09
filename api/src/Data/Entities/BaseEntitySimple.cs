using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Entities;

[Index(nameof(Id), IsUnique = true)]
public abstract class BaseEntitySimple : ICloneable
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }

    public object Clone()
    {
        return this.MemberwiseClone();
    }

    public override string ToString()
    {
        var properties = this.GetType().GetProperties();
        var classToString = string.Empty;

        properties.ToList().ForEach(prop =>
        {

            if (!string.IsNullOrWhiteSpace(this.GetType()?.GetProperty(prop.Name)?.GetValue(this)?.ToString()))
            {
                classToString += $"{prop.Name}:{this.GetType()?.GetProperty(prop.Name)?.GetValue(this)?.ToString()};";
            }
        });

        return classToString;
    }

}

