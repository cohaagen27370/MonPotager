using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Attributes;
using api.Data.Entities.ClimateDatas;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Entities.Auth;

[Table("Users")]
[Index(nameof(Name), IsUnique = false)]
[Index(nameof(Email), IsUnique = true)]
public class User : BaseEntite
{
    [Required(ErrorMessage = "Name is required")]
    [Column(TypeName = "varchar(150)")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required")]
    [Column(TypeName = "varchar(255)")]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required")]
    [Column(TypeName = "varchar(100)")]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;

    [Required] public bool Active { get; set; }

    [Column(TypeName = "varchar(20)")] public string ResetWord { get; set; } = string.Empty;

    public DateTime? ExpirationResetDate { get; set; }

    public TypesUser TypeUser { get; set; }

    public Station Station { get; set; } = new();
}