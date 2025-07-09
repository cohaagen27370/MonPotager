using System.ComponentModel;
using System.Text.Json.Serialization;

namespace api.Controllers.Authentication.dto
{

    public class TokenDto
    {
        public required string Token { get; set; } = string.Empty;

        [JsonPropertyName("expires_in")]
        public required double ExpiresIn { get; set; }

        [JsonPropertyName("token_type")]
        public required string TokenType { get; set; } = string.Empty;
        public required string Scope { get; set; } = string.Empty;
    }
}
