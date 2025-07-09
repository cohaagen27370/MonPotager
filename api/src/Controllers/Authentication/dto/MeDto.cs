using api.Attributes;

namespace api.Controllers.Authentication.dto;

public class MeDto
{
    public required string Name { get; set; } = string.Empty;
    public required string Email { get; set; } = string.Empty;
    public required TypesUser TypeUser { get; set; }
}