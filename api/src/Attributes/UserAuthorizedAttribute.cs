using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace api.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class UserAuthorizedAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!context.HttpContext.User.Claims.Any())
                context.Result = new ForbidResult();
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
                context.HttpContext.Items["typeUser"] = TypesUser.SIMPLEUSER;                
            }
        }
    }
}
