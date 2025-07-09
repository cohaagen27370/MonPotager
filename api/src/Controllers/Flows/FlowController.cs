using System.ComponentModel.DataAnnotations;
using api.Attributes;
using api.Controllers.Flows.dto;
using api.Controllers.Products.dto;
using api.Controllers.Repositories.dto;
using api.Data;
using api.Data.Entities.Workflow;
using api.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers.Flows;

[ApiController]
[Authorize]
[Route("/v{version:apiVersion}")]
[Produces("application/json")]
[Consumes("application/json")]
public class FlowController(ILogger<FlowController> logger, GardenContext context) : ControllerBase
{
    private readonly GardenContext _gardenContext = context;
    private readonly ILogger<FlowController> _logger = logger;


    /// <summary>
    ///     Add a new flow
    /// </summary>
    /// <param name="flowDto">Datas of the new flow</param>
    /// <returns>Id of the new flow</returns>
    [UserAuthorized]
    [HttpPost("flow", Name = "AddANewFlow")]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
    public async Task<IActionResult> AddNewFlow([FromBody] NewFlowDto flowDto)
    {
        var userId = HttpContext.Me();
        var newEventId = Guid.NewGuid();

        var variant = await _gardenContext.Variants.Include(x => x.Family).ThenInclude(x => x.Category)
            .SingleOrDefaultAsync(x => x.Id == flowDto.VariantId);

        if (variant == null)
            return BadRequest("Product does not exists");

        var stage = await _gardenContext.Stages.SingleAsync(x =>
            x.Id == flowDto.StartStageId && x.Category.Id == variant.Family.Category.Id);

        await _gardenContext.Events.AddAsync(new Event
        {
            CreationDate = DateTime.Now,
            Id = newEventId,
            UpdateDate = DateTime.Now,
            Stage = stage,
            Date = flowDto.StartDate
        });
        await _gardenContext.SaveChangesAsync();

        var newId = Guid.NewGuid();
        await _gardenContext.AddAsync(new Flow
        {
            Id = newId,
            CreationDate = DateTime.Now,
            UpdateDate = DateTime.Now,
            Variant = variant,
            IsClosed = false,
            Year = flowDto.StartDate.Year,
            CurrentStage = stage,
            NumberOfDaysSinceStart = 0,
            Events = [await _gardenContext.Events.SingleAsync(x => x.Id == newEventId)],
            User = await _gardenContext.Users.SingleAsync(x => x.Id == userId)
        });
        await _gardenContext.SaveChangesAsync();

        return Created("", newId);
    }

    /// <summary>
    ///     Get all flows for a user
    /// </summary>
    /// <param name="pageNumber">Number of the page</param>
    /// <param name="pageSize">Size of the page</param>
    /// <param name="year">Year of the flows</param>
    /// <param name="notHarvested">Indicate we want only not harvested flows</param>
    /// <returns>all flows</returns>
    [UserAuthorized]
    [HttpGet("flows", Name = "GetAllFlows")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ArrayFlowDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetFlows([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10,
        [FromQuery] int year = 9999, [FromQuery] bool notHarvested = true)
    {
        var userId = HttpContext.Me();

        if (year == 9999)
            year = DateTime.Now.Year;

        var flows = _gardenContext.Flows
            .Include(x => x.Events).ThenInclude(x => x.Stage)
            .Include(x => x.CurrentStage)
            .Include(x => x.Variant)
            .ThenInclude(x => x.Family)
            .ThenInclude(x => x.Category).AsQueryable();

        flows = notHarvested
            ? flows.Where(x =>
                !x.IsClosed && x.User.Id == userId && x.Year == year && x.Events.All(e => e.Stage.Rank < 100))
            : flows.Where(x => !x.IsClosed && x.User.Id == userId && x.Year == year);

        var flowsDto = await flows.OrderBy(x => x.UpdateDate).Select(x => new FlowDto
        {
            Id = x.Id,
            VariantId = x.Variant.Id,
            StartDate = x.Events.OrderByDescending(e => e.Date)
                .Select(e => e.Date)
                .First(),
            StartStage = x.Events.OrderByDescending(e => e.Date)
                .Select(e => new StageDto
                {
                    Id = e.Stage.Id,
                    Image = e.Stage.Image,
                    Label = e.Stage.Label
                })
                .First(),
            Category = new CategoryDto
            {
                Id = x.Variant.Family.Category.Id,
                Label = x.Variant.Family.Category.Label,
                Image = x.Variant.Family.Category.Image
            },
            Name = x.Variant.Family.Designation.Name,
            Variety = x.Variant.Designation.Name,
            Image = x.Variant.Designation.Image,
            ExpectedHarvestDate = x.Events[0].Date.AddDays(x.Variant.MinMaturationDaysCount),
            ExpiredHarvestDate = x.Events[0].Date.AddDays(x.Variant.MinMaturationDaysCount) < DateOnly.FromDateTime(DateTime.Now)
        }).ToListAsync();

        return Ok(new ArrayFlowDto
        {
            Count = flowsDto.Count,
            PageNumber = pageNumber,
            PageSize = pageSize,
            Datas = [.. flowsDto.Skip((pageNumber - 1) * pageSize).Take(pageSize)]
        });
    }

    /// <summary>
    ///     Get one flow
    /// </summary>
    /// <param name="flowId">Id of the flow</param>
    /// <returns>Datas of the flow</returns>
    [UserAuthorized]
    [HttpGet("flows/{flowId:guid}", Name = "GetAFlow")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(FlowDetailDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetFlow([Required(ErrorMessage = "flowId is required")][FromRoute] Guid flowId)
    {
        var userId = HttpContext.Me();

        var flow = await _gardenContext.Flows
            .Include(x => x.Events)
            .Include(x => x.Variant)
            .ThenInclude(x => x.Family)
            .ThenInclude(x => x.Category)
            .Where(x => x.Id == flowId && x.User.Id == userId)
            .Select(x => new FlowDetailDto
            {
                Product = new ProductWithVarietyDto
                {
                    Id = x.Variant.Id,
                    Name = x.Variant.Family.Designation.Name,
                    Variety = x.Variant.Designation.Name,
                    Image = x.Variant.Designation.Image,
                    Category = new CategoryDto
                    {
                        Id = x.Variant.Family.Category.Id,
                        Label = x.Variant.Family.Category.Label
                    }
                },
                Events = x.Events.Select(e => new EventDto
                {
                    Id = e.Id,
                    Stage = new StageDto
                    {
                        Id = e.Stage.Id,
                        Label = e.Stage.Label,
                        Image = e.Stage.Image
                    },
                    Date = e.Date
                }).OrderBy(b => b.Date).ToList(),
                IsClosed = x.IsClosed,
                Year = x.Year,
                NumberOfDaysSinceStart =
                    (x.Events.OrderBy(b => b.Date).Last().Date.ToDateTime(TimeOnly.MinValue) -
                     x.Events.OrderBy(b => b.Date).First().Date.ToDateTime(TimeOnly.MinValue)).TotalDays,
                CurrentStage = new StageDto
                {
                    Id = x.CurrentStage.Id,
                    Label = x.CurrentStage.Label,
                    Image = x.CurrentStage.Image
                }
            }).SingleOrDefaultAsync();

        if (flow == null)
            return NotFound("No flows for this id");

        return Ok(flow);
    }


    /// <summary>
    ///     Add a new event in a existing flow
    /// </summary>
    /// <param name="flowId">Id of the flow</param>
    /// <param name="newStage">Datas to add event</param>
    /// <returns>Id of the event</returns>
    [UserAuthorized]
    [HttpPost("flow/{flowId:guid}/step", Name = "AddAEventOnAFlow")]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
    public async Task<IActionResult> AddNewStep([Required(ErrorMessage = "flowId is required")][FromRoute] Guid flowId,
        [FromBody] NewStageDto newStage)
    {
        var userId = HttpContext.Me();

        var flow = await _gardenContext.Flows.Include(x => x.Events).Include(x => x.Variant)
            .SingleOrDefaultAsync(x => x.Id == flowId && x.User.Id == userId);

        if (flow == null) return BadRequest("Flow does not exists");

        var newEventId = Guid.NewGuid();
        var stage = await _gardenContext.Stages.SingleAsync(x => x.Id == newStage.Id);

        await _gardenContext.Events.AddAsync(new Event
        {
            CreationDate = DateTime.Now,
            Id = newEventId,
            UpdateDate = DateTime.Now,
            Stage = stage,
            Date = newStage.Date
        });
        await _gardenContext.SaveChangesAsync();

        flow.UpdateDate = DateTime.Now;
        flow.CurrentStage = stage;
        flow.NumberOfDaysSinceStart = flow.Events.Count > 1
            ? Convert.ToInt32((flow.Events.OrderByDescending(x => x.Date).First().Date.ToDateTime(TimeOnly.MinValue) -
                               flow.Events.OrderByDescending(x => x.Date).Last().Date.ToDateTime(TimeOnly.MinValue))
                .TotalDays)
            : Convert.ToInt32((flow.Events.OrderByDescending(x => x.Date).First().Date.ToDateTime(TimeOnly.MinValue) -
                               flow.CreationDate).TotalDays);
        flow.Events.Add(await _gardenContext.Events.SingleAsync(x => x.Id == newEventId));

        await _gardenContext.SaveChangesAsync();

        var events = await _gardenContext.Events.Where(x => x.Flow!.Id == flow.Id).ToListAsync();
        flow.Events = [.. events.OrderBy(x => x.Date).ToList()];
        await _gardenContext.SaveChangesAsync();

        return Created("", newEventId);
    }
}