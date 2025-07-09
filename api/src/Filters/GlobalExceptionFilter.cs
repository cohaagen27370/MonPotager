using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace api.Filters;

public class GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger) : IExceptionFilter
{

    private readonly ILogger<GlobalExceptionFilter> _logger = logger;

    public void OnException(ExceptionContext context)
    {
        var exception = context.Exception;


        if (exception is UnauthorizedAccessException)
        {
            context.Result = new UnauthorizedObjectResult(exception.Message);
        }
        else
        {
            if (exception is BadHttpRequestException)
            {
                context.Result = new BadRequestObjectResult(exception.Message);
            }
            else
            {
                _logger.LogError(exception?.InnerException?.Message ?? exception?.Message);
                context.Result = new StatusCodeResult(500);
            }
        }
    }
}
