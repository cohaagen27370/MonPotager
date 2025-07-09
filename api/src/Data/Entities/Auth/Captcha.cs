using System.ComponentModel.DataAnnotations.Schema;

namespace api.Data.Entities.Auth;

[Table("Captchas")]
public class Captcha : BaseEntite
{
    public string Value { get; set; } = string.Empty;

    public bool IsActive { get; set; }

    public DateTime ActivationDate { get; set; }

}
