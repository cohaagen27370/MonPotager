using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using api.Attributes;
using api.Data.Entities.Auth;
using Microsoft.IdentityModel.Tokens;

namespace api.Services;

public class CryptService(IConfiguration configuration, IWebHostEnvironment env) : ICryptService
{
    protected readonly IConfiguration _configuration = configuration;

    private readonly IWebHostEnvironment _env = env;

    public string CryptingPassword(string clearPassword)
    {
        return BCrypt.Net.BCrypt.HashPassword(
            clearPassword,
            Convert.ToInt32(_configuration["JwtConfig:Salt"])
        );
    }

    public bool CheckPassword(string? clearPassword, string? cryptedPassword)
    {
        if (
            string.IsNullOrWhiteSpace(cryptedPassword)
            || string.IsNullOrWhiteSpace(cryptedPassword)
        )
            return false;

        return BCrypt.Net.BCrypt.Verify(clearPassword, cryptedPassword);
    }


    public string GenerateJwtToken(User user, bool shortExpiration = false)
    {
        return GenerateJwtToken(
            user.Id,
            user.Email,
            user.TypeUser,
            shortExpiration
        );
    }

    public string GenerateJwtToken(
        Guid id,
        string email,
        TypesUser typeUser,
        bool shortExpiration = false
    )
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var certificate = new X509Certificate2(Path.Combine(_env.WebRootPath, "x509-cert.pfx"),
            _configuration["JwtConfig:Password"]);
        var securityKey = new X509SecurityKey(certificate);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Sub, id.ToString()),
            new(JwtRegisteredClaimNames.Email, email)
        };

        if (typeUser == TypesUser.ADMINISTRATOR)
            claims.Add(new Claim(JwtRegisteredClaimNames.Typ, CryptingString(email)));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = shortExpiration
                ? DateTime.UtcNow.AddMinutes(10)
                : DateTime.UtcNow.AddHours(8),
            Issuer = _configuration["JwtConfig:Issuer"],
            Audience = _configuration["JwtConfig:Audience"],
            SigningCredentials = new SigningCredentials(
                securityKey,
                SecurityAlgorithms.RsaSha512Signature
            )
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public string CryptingString(string clearText)
    {
        if (string.IsNullOrEmpty(clearText))
            throw new ArgumentException(
                "Le texte ne doit pas être nul ou vide.",
                nameof(clearText)
            );

        var buffer = Encoding.UTF8.GetBytes(clearText);
        var hash = SHA512.Create(); // SHA512CryptoServiceProvider.Create();
        var aesKey = new byte[24];
        Buffer.BlockCopy(
            hash.ComputeHash(Encoding.UTF8.GetBytes(_configuration["JwtConfig:Password"]!)),
            0,
            aesKey,
            0,
            24
        );

        using var aes = Aes.Create();
        if (aes == null)
            throw new ArgumentException("Parameter must not be null.", nameof(aes));

        aes.Key = aesKey;

        using (var encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
        using (var resultStream = new MemoryStream())
        {
            using (
                var aesStream = new CryptoStream(resultStream, encryptor, CryptoStreamMode.Write)
            )
            using (var plainStream = new MemoryStream(buffer))
            {
                plainStream.CopyTo(aesStream);
            }

            var result = resultStream.ToArray();
            var combined = new byte[aes.IV.Length + result.Length];
            Array.ConstrainedCopy(aes.IV, 0, combined, 0, aes.IV.Length);
            Array.ConstrainedCopy(result, 0, combined, aes.IV.Length, result.Length);

            return Convert.ToBase64String(combined);
        }
    }

    public string UncryptingString(string cryptedString)
    {
        if (string.IsNullOrEmpty(cryptedString))
            throw new ArgumentException(
                "The encrypted text must have valid value.",
                nameof(cryptedString)
            );
        cryptedString = cryptedString.Replace(" ", "+");
        var combined = Convert.FromBase64String(cryptedString);
        var buffer = new byte[combined.Length];
        var aesKey = new byte[24];
        Buffer.BlockCopy(
            SHA512.HashData(Encoding.UTF8.GetBytes(_configuration["JwtConfig:Password"]!)),
            0,
            aesKey,
            0,
            24
        );

        using (var aes = Aes.Create())
        {
            if (aes == null)
                throw new ArgumentException("Parameter must not be null.", nameof(aes));

            aes.Key = aesKey;

            var iv = new byte[aes.IV.Length];
            var ciphertext = new byte[buffer.Length - iv.Length];

            Array.ConstrainedCopy(combined, 0, iv, 0, iv.Length);
            Array.ConstrainedCopy(combined, iv.Length, ciphertext, 0, ciphertext.Length);

            aes.IV = iv;

            using (var decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
            using (var resultStream = new MemoryStream())
            {
                using (
                    var aesStream = new CryptoStream(
                        resultStream,
                        decryptor,
                        CryptoStreamMode.Write
                    )
                )
                using (var plainStream = new MemoryStream(ciphertext))
                {
                    plainStream.CopyTo(aesStream);
                }

                return Encoding.UTF8.GetString(resultStream.ToArray());
            }
        }
    }
}