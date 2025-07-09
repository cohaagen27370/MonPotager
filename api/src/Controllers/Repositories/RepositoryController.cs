using api.Attributes;
using api.Controllers.Products.dto;
using api.Controllers.Repositories.dto;
using api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    /// <summary>
    ///     Repository controller
    /// </summary>
    [ApiController]
    [Route("/v{version:apiVersion}/repository")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class RepositoryController(ILogger<RepositoryController> logger, GardenContext context) : ControllerBase
    {
        private readonly GardenContext _gardenContext = context;
        private readonly ILogger<RepositoryController> _logger = logger;

        /// <summary>
        ///     Get all stations
        /// </summary>
        /// <returns>List of categories</returns>
        [HttpGet("stations", Name = "GetAllStations")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(List<ForecastStationDto>), StatusCodes.Status200OK)]
        [ResponseCache(Duration = 31536000)]
        public async Task<IActionResult> GetAllStations()
        {
            return Ok(await _gardenContext.Stations.Include(x => x.Climate).Select(x => new ForecastStationDto()
            {
                Id = x.Id,
                ClimateName = x.Climate.Label,
                CodeDepartement = x.Code,
                Name = x.Name,
                Latitude = x.Latitude,
                Longitude = x.Longitude
            }).ToListAsync());
        }

        /// <summary>
        ///     Get all product categories
        /// </summary>
        /// <returns>List of categories</returns>      
        [Authorize] 
        [AdminAuthorized]
        [HttpGet("categories", Name = "GetCategories")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(List<CategoryDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllCategories()
        {
            return Ok(await _gardenContext.Categories.Select(x => new CategoryDto()
            {
                Id = x.Id,
                Label = x.Label,
                Image = x.Image
            }).ToListAsync());
        }

        /// <summary>
        ///     Get all stages
        /// </summary>
        /// <returns>List of categories</returns>
        [Authorize] 
        [AdminAuthorized]        
        [HttpGet("stages", Name = "GetStagesByCategory")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(List<StageDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetStagesByCategory([FromQuery] int category)
        {
            return Ok(await _gardenContext.Stages.Where(x => x.Category.Id == category).Select(x => new StageDto()
            {
                Id = x.Id,
                Image = x.Image,
                Label = x.Label,
                Rank = x.Rank
            }).ToListAsync());
        }

        /// <summary>
        ///     Get all stages
        /// </summary>
        /// <returns>List of categories</returns>
        [Authorize] 
        [UserAuthorized]        
        [HttpGet("stages/start", Name = "GetStartStagesByCategory")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(List<StageDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetStartStagesByCategory([FromQuery] int category)
        {
            return category switch
            {
                1 or 2 => Ok(await _gardenContext.Stages.Where(x => x.Category.Id == category && x.Rank <= 2).Select(x => new StageDto()
                {
                    Id = x.Id,
                    Image = x.Image,
                    Label = x.Label,
                    Rank = x.Rank
                }).ToListAsync()),// vegetable & fruit
                3 => Ok(await _gardenContext.Stages.Where(x => x.Category.Id == category && x.Rank == 1).Select(x => new StageDto()
                {
                    Id = x.Id,
                    Image = x.Image,
                    Label = x.Label,
                    Rank = x.Rank
                }).ToListAsync()),// préparation
                _ => NotFound(),
            };
        }


        /// <summary>
        ///     Get all families
        /// </summary>
        /// <returns>List of families</returns>
        [Authorize] 
        [AdminAuthorized]        
        [HttpGet("families", Name = "GetFamilies")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(List<ProductWithNameDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetFamilies()
        {
            return Ok(await _gardenContext.Families.Include(x => x.Category).GroupBy(x => x.Designation.Name).Select(
                g =>
                    new ProductWithNameDto
                    {
                        Name = g.Key,
                        Image = g.First().Designation.Image,
                        Category = new CategoryDto
                        {
                            Id = g.First().Category.Id,
                            Label = g.First().Category.Label
                        }
                    }).ToListAsync());
        }
    }
}