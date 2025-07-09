using System;

namespace api.Controllers.Authentication.captcha;

public class CaptchaData
{
    public byte[] Image { get; set; } = [];

    public string Value { get; set; } = string.Empty;
}
