using System.Net.Mail;
using System.Threading.Tasks;
using api.Attributes;
using api.Controllers.Authentication.captcha;
using api.Controllers.Authentication.dto;
using api.Data;
using api.Data.Entities.Auth;
using api.Data.Entities.ClimateDatas;
using api.Extensions;
using api.Services;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;

namespace api.Controllers;

[ApiController]
[Route("/v{version:apiVersion}/users")]
[Consumes("application/json")]
public class AuthController(ILogger<AuthController> logger, GardenContext context, ICryptService cryptService, IWebHostEnvironment env)
    : ControllerBase
{
    private readonly ICryptService _cryptService = cryptService;
    private readonly GardenContext _gardenContext = context;
    private readonly ILogger<AuthController> _logger = logger;

    static readonly string[] Scopes = { GmailService.Scope.GmailSend };
    static readonly string ApplicationName = "LeCompagnonDuJardinier";

    private readonly IWebHostEnvironment _env = env;

    /// <summary>
    ///     Create a new captcha
    /// </summary>
    /// <returns>Captcha data</returns>
    [AllowAnonymous]
    [HttpPost("captcha", Name = "GenerateCaptcha")]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(CaptchaDto), StatusCodes.Status200OK)]
    public async Task<ActionResult> CreateCaptcha()
    {
        var factory = new CaptchaFactory();
        var captcha = factory.Create();

        var newId = Guid.NewGuid();
        await _gardenContext.Captchas.AddAsync(new Captcha
        {
            CreationDate = DateTime.Now,
            UpdateDate = DateTime.Now,
            IsActive = true,
            Value = captcha.Value,
            Id = newId
        });
        await _gardenContext.SaveChangesAsync();

        Response.Headers.Append("captchaId", newId.ToString());

        return Ok(new CaptchaDto() {
            Id = newId,
            Image = Convert.ToBase64String(captcha.Image)
        });
    }

    /// <summary>
    ///     Add a new user
    /// </summary>
    /// <param name="user">Data of the user</param>
    /// <returns>Id of the new user</returns>
    [AllowAnonymous]
    [HttpPost("", Name = "AddNewUser")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(string), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
    public async Task<ActionResult> Add([FromBody] UserDto user)
    {
        #region Captcha management

        if (string.IsNullOrWhiteSpace(user.CaptchaValue)) return BadRequest("CAPTCHA IS EMPTY");

        var captcha = await _gardenContext.Captchas.SingleOrDefaultAsync(x => x.Id == user.CaptchaId && x.IsActive);
        if (captcha == null || captcha.Value != user.CaptchaValue) return BadRequest("CAPTCHA IS INVALID");
        captcha.IsActive = false;
        captcha.ActivationDate = DateTime.Now;
        captcha.UpdateDate = DateTime.Now;
        await _gardenContext.SaveChangesAsync();

        #endregion Captcha management

        #region Station
        Station? station = await _gardenContext.Stations.SingleOrDefaultAsync(x => x.Id == user.StationId);

        if (station == null)
            return BadRequest("StationId is required");

        #endregion Station

        var userWithExistingEmail = await _gardenContext.Users.AnyAsync(x =>
            x.Email.ToLower() == user.Email.ToLower()
        );

        if (userWithExistingEmail)
            return Conflict(
                $"User with email '{user.Email}' already exists"
            );

        var newUser = new User
        {
            Id = Guid.NewGuid(),
            Active = true,
            CreationDate = DateTime.Now,
            UpdateDate = DateTime.Now,
            Name = user.Name,
            Email = user.Email,
            Password = _cryptService.CryptingPassword(
                user.Password
            ),
            TypeUser = TypesUser.SIMPLEUSER,
            Station = station            
        };

        _gardenContext.Users.Add(newUser);
        await _gardenContext.SaveChangesAsync();

        await this.SendingMail(user.Email,"[le compagnon du jardinier] Bienvenue !","AccountCreated");

        return Created("", newUser.Id);
    }


    /// <summary>
    ///     Login and get token
    /// </summary>
    /// <param name="credential">Credential to login</param>
    /// <returns>Token jwt</returns>
    [AllowAnonymous]
    [HttpPost("login", Name = "Login")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(TokenDto), StatusCodes.Status201Created)]
    public async Task<IActionResult> LogIn(CredentialDto credential)
    {
        var user = await _gardenContext
            .Users
            .Where(x => x.Email.ToLower() == credential.Email.ToLower() && x.Active)
            .SingleOrDefaultAsync();

        if (user == null)
            return NotFound($"Email {credential.Email} unkown");

        var connexionOk = _cryptService.CheckPassword(
            credential.Password,
            user.Password
        );

        var token = _cryptService.GenerateJwtToken(user);

        if (!connexionOk)
            return Unauthorized();

        return Ok(new TokenDto
        {
            Token = token,
            ExpiresIn = TimeSpan.FromHours(8).TotalSeconds,
            TokenType = "Bearer",
            Scope = "MonPotager"
        });
    }

    /// <summary>
    ///     Get informations of the authenticated user
    /// </summary>
    /// <returns>Datas of the user</returns>
    [UserAuthorized]
    [HttpGet("me", Name = "GetMe")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(MeDto), StatusCodes.Status200OK)]
    public IActionResult Me()
    {
        var userId = HttpContext.Me();

        var user = _gardenContext.Users.SingleOrDefault(x => x.Id == userId);

        if (user == null) return NotFound("User does not exists");

        return Ok(new MeDto
        {
            Name = user.Name,
            Email = user.Email,
            TypeUser = user.TypeUser
        });
    }


    /// <summary>
    ///     Asking for resetting current password
    /// </summary>
    /// <param name="resetPasswordRequestDto">Email of the user</param>
    /// <returns>Nothing</returns>
    [AllowAnonymous]
    [HttpPost("reset/request", Name = "ResetPassword")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> RequestResetPassword([FromBody] ResetPasswordRequestDto resetPasswordRequestDto)
    {
        var resetWord = new Random().Next(100000, 999999);

        var user = await _gardenContext.Users.SingleOrDefaultAsync(x =>
            x.Email.ToLower() == resetPasswordRequestDto.Email.ToLower());

        if (user == null) return NotFound("Email not exists");

        user.ExpirationResetDate = DateTime.Now.AddMinutes(10);
        user.ResetWord = resetWord.ToString();

        await _gardenContext.SaveChangesAsync();

        //TODO: Envoi du mail
        await this.SendingMail(user.Email,"[le compagnon du jardinier] Réinitialisation du mot de passe","ResetPassword",resetWord.ToString());

        return NoContent();
    }


    [AllowAnonymous]
    [HttpPost("reset/response", Name = "GetResetPasswordResponse")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> ResponseResetPassword([FromBody] ResetPasswordResponseDto resetPasswordResponseDto)
    {
        var user = await _gardenContext.Users.SingleOrDefaultAsync(x =>
            x.Email.ToLower() == resetPasswordResponseDto.Email.ToLower());
        if (user == null) return NotFound("Email not exists");

        if (user.ResetWord == resetPasswordResponseDto.ResetWord &&
            user.ExpirationResetDate >= DateTime.Now)
        {
            user.Password = _cryptService.CryptingPassword(
                resetPasswordResponseDto.NewPassword
            );
            user.ExpirationResetDate = null;
            user.ResetWord = "";

            await _gardenContext.SaveChangesAsync();

            return NoContent();
        }

        return Unauthorized("Bad reset word or reset word expired");
    }

    private static string Encode(string text)
    {
        byte[] bytes = System.Text.Encoding.UTF8.GetBytes(text);

        return System.Convert.ToBase64String(bytes)
            .Replace('+', '-')
            .Replace('/', '_')
            .Replace("=", "");
    }

    private async Task SendingMail(string mailTo, string subject, string template, string dynamiqueContent = "") {
        
        UserCredential credential;

        var templateContent = System.IO.File.ReadAllText(Path.Combine(_env.WebRootPath, "templates", $"{template}.html"));
        if (!string.IsNullOrWhiteSpace(templateContent)) {
            templateContent = templateContent.Replace("{{REINIT}}", dynamiqueContent);
        }

        using (var stream = new FileStream(Path.Combine(_env.WebRootPath,"client_secret_553213029721-u69tgjf6omiuijk4fvvon0oacqc8amet.apps.googleusercontent.com.json"), FileMode.Open, FileAccess.Read))
        {
            string credPath = "gtoken.json";
            credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                GoogleClientSecrets.FromStream(stream).Secrets,
                Scopes,
                "LeCompagnonDuJardinierServer",
                CancellationToken.None,
                new FileDataStore(credPath, true)).Result;
            Console.WriteLine("Credential file saved to: " + credPath);
        }

        var service = new GmailService(new BaseClientService.Initializer()
        {
            HttpClientInitializer = credential,
            ApplicationName = ApplicationName,
        });

        var message = new MailMessage
        {
            From = new MailAddress("LeCompagnonDuJardinier@gmail.com","Le compagnon du jardinier")
        };
        message.To.Add(mailTo);
        message.Subject = subject;
        message.Body = templateContent;
        message.IsBodyHtml = true;

        var newId = Guid.NewGuid();
        await _gardenContext.Emails.AddAsync(new Email() {
            Address = mailTo,
            CreationDate = DateTime.Now,
            UpdateDate = DateTime.Now,
            SendingDate = DateTime.Now,
            Subject = subject,
            Content = templateContent,
            Id = newId
        });
        await _gardenContext.SaveChangesAsync();

        var mimeMessage = MimeKit.MimeMessage.CreateFromMailMessage(message);

        var gmailMessage = new Google.Apis.Gmail.v1.Data.Message {
            Raw = Encode(mimeMessage.ToString())
        };

        UsersResource.MessagesResource.SendRequest request = service.Users.Messages.Send(gmailMessage,"me");

        try
        {
            await request.ExecuteAsync();
        }
        catch(Exception ex) {
            var emailError = _gardenContext.Emails.FirstOrDefault(x => x.Id == newId);

            if (emailError != null) {
                emailError.Result = ex.Message;
                await _gardenContext.SaveChangesAsync();
            }

            return;
        }

        var email = _gardenContext.Emails.FirstOrDefault(x => x.Id == newId);

        if (email != null) {
            email.Result = "OK";
            await _gardenContext.SaveChangesAsync();
        }

    }

}