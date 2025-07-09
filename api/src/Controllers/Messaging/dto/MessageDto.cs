namespace api.Controllers.Messaging.dto;

public class MessageDto
{
    public Guid Id { get; set; }

    public string Image { get; set; } = string.Empty;

    public string Content { get; set; } = string.Empty;

    public DateTime CreationDate { get; set; }

    public bool IsSpecific { get; set; }
}