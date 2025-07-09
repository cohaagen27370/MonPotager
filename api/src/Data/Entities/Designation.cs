using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Entities
{
    [Owned]
    [Index(nameof(Name), IsUnique = false)]
    public class Designation
    {
        [Column(TypeName = "varchar(150)")] public string Name { get; set; } = string.Empty;

        [Column(TypeName = "varchar(150)")] public string Image { get; set; } = string.Empty;

        public string ImageSource { get; set; } = string.Empty;
    }
}