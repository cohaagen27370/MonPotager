using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace api.Controllers.Authentication.dto
{

    public class ResetPasswordResponseDto : ResetPasswordRequestDto
    {

        [Required(ErrorMessage = "ResetWord is required")]
        public required string ResetWord { get; set; } = string.Empty;

        [Required(ErrorMessage = "Newpassword is required")]
        public required string NewPassword { get; set; } = string.Empty;

    }
}