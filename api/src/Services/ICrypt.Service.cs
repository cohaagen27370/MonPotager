using api.Attributes;
using api.Data.Entities.Auth;

namespace api.Services;

public interface ICryptService
{
    string CryptingPassword(string ClearPassword);
    bool CheckPassword(string? clearPassword, string? cryptedPassword);

    string GenerateJwtToken(
        Guid id,
        string email,
        TypesUser typeUser,
        bool shortExpiration = false
    );

    string GenerateJwtToken(User user, bool shortExpiration = false);
    
    string CryptingString(string clearText);
    string UncryptingString(string cryptedString);
    
}