using api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace api.Attributes;

public class AdminAuthorizedAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var env = context.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
        var config = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
        var cryptService = new CryptService(config, env);

        if (!context.HttpContext.User.Claims.Any())
        {
            context.Result = new ForbidResult();
        }
        else
        {
            var type = context.HttpContext.User.Claims.FirstOrDefault(x =>
                x.Type == "typ");
            if (type == null)
            {
                context.Result = new ForbidResult();
            }
            else
            {
                var userId = context.HttpContext.User.Claims
                    .First(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")
                    .Value;

                context.HttpContext.Items["userId"] = userId;
                context.HttpContext.Items["Email"] = context.HttpContext.User.Claims
                    .First(
                        x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
                    )
                    .Value;

                if (cryptService.UncryptingString(type.Value) != context.HttpContext?.Items["Email"]?.ToString())
                    context.Result = new ForbidResult();
            }
        }
    }
}