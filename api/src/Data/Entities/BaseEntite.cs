using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Entities
{
    [Index(nameof(Id), IsUnique = true)]
    [Index(nameof(CreationDate), IsUnique = false)]
    [Index(nameof(UpdateDate), IsUnique = false)]
    public abstract class BaseEntite : ICloneable
    {
        [Key]
        public Guid Id { get; set; }

        public object Clone()
        {
            return this.MemberwiseClone();
        }

        [IgnoreDataMember]
        [DataType(DataType.DateTime)]
        public DateTime CreationDate { get; set; }

        [IgnoreDataMember]
        [DataType(DataType.DateTime)]
        public DateTime UpdateDate { get; set; }

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
}
