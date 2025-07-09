
using System.ComponentModel.DataAnnotations;

namespace api.Controllers.Authentication.dto
{
    public class UserDto
    {
        [Required(ErrorMessage = "Name is required")]
        public required string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        public required string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        public required string Password { get; set; } = string.Empty;

        public string? CaptchaValue { get; set; }
        public Guid? CaptchaId { get; set; }

        public Guid? StationId { get; set; }
    }
}
