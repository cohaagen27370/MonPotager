using System.ComponentModel.DataAnnotations.Schema;
using api.Data.Entities.Auth;

namespace api.Data.Entities.Messaging;

[Table("Messages")]
public class Message : BaseEntite
{
    public string Image { get; init; } = string.Empty;

    public string Content { get; init; } = string.Empty;

    public User? User { get; init; }
}