using System.Threading.Tasks;
using api.Attributes;
using api.Controllers.Messaging.dto;
using api.Data;
using api.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers.Messaging;

[ApiController]
[Authorize]
[Route("/v{version:apiVersion}")]
[Produces("application/json")]
[Consumes("application/json")]
public class MessagingController(ILogger<MessagingController> logger, GardenContext context) : ControllerBase
{
    private readonly GardenContext _gardenContext = context;
    private readonly ILogger<MessagingController> _logger = logger;

    /// <summary>
    ///     Get current messages
    /// </summary>
    /// <param name="pageNumber">number of the page</param>
    /// <param name="pageSize">size of the page</param>
    /// <returns>List of messages</returns>
    [UserAuthorized]
    [HttpGet("messages", Name = "GetMessages")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ArrayMessageDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetMessages([FromQuery] int pageNumber = 0, [FromQuery] int pageSize = 10)
    {
        var userId = HttpContext.Me();

        var messages = await _gardenContext.Messages.Include(x => x.User)
            .Where(x => x.User == null || x.User.Id == userId)
            .OrderByDescending(x => x.CreationDate)
            .Select(x => new MessageDto
            {
                Id = x.Id,
                CreationDate = x.CreationDate,
                Image = x.Image,
                Content = x.Content,
                IsSpecific = x.User != null
            }).ToListAsync();

        if (messages.Count == 0)
            return NotFound("No messages");

        return Ok(new ArrayMessageDto
        {
            Count = messages.Count,
            PageNumber = pageNumber,
            PageSize = pageSize,
            Datas = [.. messages.Skip((pageNumber - 1) * pageSize).Take(pageSize)]
        });

    }
}