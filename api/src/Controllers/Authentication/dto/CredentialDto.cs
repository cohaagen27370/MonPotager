using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace api.Controllers.Authentication.dto
{
    public class CredentialDto
    {
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = string.Empty;
    }
}
