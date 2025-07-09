using System;

namespace api.Controllers.Authentication.dto;

public class CaptchaDto
{
    public string Image { get; set; } = string.Empty;
    public Guid Id { get; set; }
}
