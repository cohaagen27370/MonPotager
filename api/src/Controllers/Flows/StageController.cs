using api.Attributes;
using api.Controllers.Repositories.dto;
using api.Data;
using api.Data.Entities.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers.Flows
{
    /// <summary>
    ///     stages management controller
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("/v{version:apiVersion}")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class StageController(ILogger<StageController> logger, GardenContext context) : ControllerBase
    {
        private readonly GardenContext _gardenContext = context;
        private readonly ILogger<StageController> _logger = logger;

        /// <summary>
        ///     Get possibles steps
        /// </summary>
        /// <param name="flowId">Id of the flow</param>
        /// <returns>List of possibles steps</returns>
        [UserAuthorized]
        [HttpGet("flow/{flowId:guid}/stages", Name = "GetStagesPossibleByFlow")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(List<StageDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetStages([FromRoute] Guid flowId)
        {
            // Get the flow
            var flow = _gardenContext.Flows
                .Include(item => item.Events)
                .ThenInclude(@event => @event.Stage).Include(flow => flow.Variant).ThenInclude(x => x.Family).ThenInclude(family => family.Category)
                .SingleOrDefault(x => x.Id == flowId);

            if (flow == null) return NotFound("Flow does not exists");

            // Get the category of the product
            var type = flow.Variant.Family.Category;

            // Get possibles stage to choose
            return Ok(await _gardenContext.Stages
                .Where(x => x.Category.Id == type.Id && (x.Rank > flow.CurrentStage.Rank || x.IsMultiple == true))
                .Select(x => new StageDto()
                {
                    Id = x.Id,
                    Label = x.Label,
                    Image = x.Image,
                    Rank = x.Rank
                })
                .ToListAsync());
        }
    }
}