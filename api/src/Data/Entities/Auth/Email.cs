using System.ComponentModel.DataAnnotations.Schema;

namespace api.Data.Entities.Auth;

[Table("Emails")]
public class Email: BaseEntite
{
    public string Address { get; set; } = string.Empty;

    public DateTime SendingDate { get; set; }

    public string Subject { get; set; } = string.Empty;

    [Column(TypeName = "varchar(max)")]
    public string Content { get; set; } = string.Empty;

    public string Result { get; set; } = string.Empty;

}
