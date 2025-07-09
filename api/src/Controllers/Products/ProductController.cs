using api.Controllers.Products.dto;
using api.Data;
using api.Data.Entities;
using api.Data.Entities.Catalog;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers.Products;

/// <summary>
///     Products repository
/// </summary>
[ApiController]
[Route("/v{version:apiVersion}")]
[Consumes("application/json")]
[Produces("application/json")]
public class ProductController(ILogger<ProductController> logger, GardenContext context) : ControllerBase
{
    private readonly GardenContext _gardenContext = context;
    private readonly ILogger<ProductController> _logger = logger;

    /// <summary>
    ///     Get variants by filters
    /// </summary>
    /// <param name="q">Name of the family or of the variant</param>
    /// <param name="pageSize">Size of the page</param>
    /// <param name="pageNumber">Number of the page</param>
    /// <returns>List of variant</returns>
    [HttpGet("products/search", Name = "GetVariantsByCriterias")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ArrayProductWithVarietyDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProducts([FromQuery] string q, [FromQuery] int pageSize,[FromQuery] int pageNumber)
    {
        if (string.IsNullOrWhiteSpace(q))
            return Ok(new List<ProductWithVarietyDto>());

        var varietiesDb = _gardenContext.Variants.Include(x => x.Family).ThenInclude(x => x.Category).AsQueryable();

        if (!string.IsNullOrWhiteSpace(q))
            varietiesDb = varietiesDb.Where(x =>
                EF.Functions.Like(x.Family.Designation.Name.ToLower(), $"%{q.ToLower()}%") ||
                EF.Functions.Like(x.Designation.Name.ToLower(), $"%{q.ToLower()}%")).AsNoTracking();

        var varieties = await varietiesDb.Select(v => new ProductWithVarietyDto
        {
            Image = v.Designation.Image,
            Name = v.Family.Designation.Name,
            Variety = v.Designation.Name,
            Id = v.Id,
            Category = new CategoryDto
            {
                Id = v.Family.Category.Id,
                Label = v.Family.Category.Label
            }
        }).ToListAsync();

        if (varieties.Count == 0) return Ok(varieties);

        var search =
            await _gardenContext.Searches.FirstOrDefaultAsync(x => x.SearchDesignation.Name == varieties.First().Name);

        if (search != null)
            search.SearchCount++;
        else
            _gardenContext.Searches.Add(new Search
            {
                SearchDesignation = new Designation
                {
                    Name = varieties.First().Name,
                    Image = varieties.First().Image
                },
                SearchCount = 1,
                CreationDate = DateTime.Now,
                UpdateDate = DateTime.Now
            });

        await _gardenContext.SaveChangesAsync();

        return Ok(new ArrayProductWithVarietyDto
        {
            Count = varieties.Count,
            PageNumber = pageNumber,
            PageSize = pageSize,
            Datas = [.. varieties.Skip(pageNumber * pageSize).Take(pageSize)]
        });
    }

    /// <summary>
    ///     Get variants by family
    /// </summary>
    /// <param name="name">Name of the family</param>
    /// <returns>List of variants</returns>
    [HttpGet("families/{name}/variants", Name = "GetVariantsByFamilyName")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(List<ProductWithNameDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetVariantsByFamilyName([FromRoute] string name)
    {
        return Ok(await _gardenContext.Variants.Include(x => x.Family).Where(x => x.Family.Designation.Name == name)
            .Select(x =>
                new ProductWithVarietyDto
                {
                    Image = x.Designation.Image,
                    Name = x.Family.Designation.Name,
                    Variety = x.Designation.Name,
                    Category = new CategoryDto
                    {
                        Id = x.Family.Category.Id,
                        Label = x.Family.Category.Label
                    },
                    Id = x.Id
                }).Take(50).ToListAsync());
    }

    [HttpGet("products/searched", Name = "GetMostSearchedProducts")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(List<ProductWithNameDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetMostSearchedProducts()
    {
        var searchProducts = await _gardenContext.Searches.OrderByDescending(x => x.SearchCount).Take(6)
            .Select(x => new ProductWithNameDto
            {
                Name = x.SearchDesignation.Name,
                Image = x.SearchDesignation.Image
            }).ToListAsync();

        searchProducts.ForEach(product =>
        {
            var category = _gardenContext.Families.Include(x => x.Category)
                .FirstOrDefault(f => f.Designation.Name == product.Name);

            if (category != null)
                product.Category = new CategoryDto
                {
                    Id = category.Category.Id,
                    Label = category.Category.Label
                };
        });

        return Ok(searchProducts);
    }

    /// <summary>
    ///     Get one product by its Id
    /// </summary>
    /// <param name="productId">Id of the product</param>
    /// <returns>Data of the product</returns>
    [HttpGet("product/{productId:guid}/details", Name = "GetProductById")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ProductWithDescriptionDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProduct([FromRoute] Guid productId)
    {
        var product = await _gardenContext.Variants.Include(x => x.Family).ThenInclude(x => x.Category)
            .SingleOrDefaultAsync(x => x.Id == productId);

        if (product == null) return NotFound("Product not exists");

        return Ok(new ProductWithDescriptionDto
        {
            Id = product.Id,
            FamilyName = product.Family.Designation.Name,
            FamilyImage = product.Family.Designation.Image,
            Image = product.Designation.Image,
            ImageSource = product.Designation.ImageSource,
            Name = product.Designation.Name,
            Description = product.Family.Description,
            DescriptionSource = product.Family.DescriptionSource,
            MinMaturationDaysCount = product.MinMaturationDaysCount,
            MaxMaturationDaysCount = product.MaxMaturationDaysCount,
            Seeding = product.SowingMonths,
            Harvesting = product.HarvestMonths,
            GerminationMinimalTemperature = product.Family.GerminationMinimalTemperature,
            GerminationOptimaleTemperature = product.Family.GerminationOptimaleTemperature,
            MinimalRisingTime = product.Family.MinimalRisingTime,
            MaximumRisingTime = product.Family.MaximumRisingTime,
            IdealGrowingTemperature = product.Family.IdealGrowingTemperature,
            ZeroVegetation = product.Family.ZeroVegetation,
            SunshineDuration = product.Family.SunshineDuration
        });
    }
}