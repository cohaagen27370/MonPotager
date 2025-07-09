using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace api.Controllers.Authentication.dto
{
    public class ResetPasswordRequestDto
    {
        [Required(ErrorMessage = "Email is required")]
        public required string Email { get; set; } = string.Empty;
    }
}