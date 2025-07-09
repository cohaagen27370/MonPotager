using System.ComponentModel.DataAnnotations;
using api.Attributes;
using api.Controllers.Administration.dto;
using api.Data;
using api.Data.Entities;
using api.Data.Entities.Catalog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers.Administration;

[ApiController]
[Authorize]
[Route("/v{version:apiVersion}/admin")]
[Produces("application/json")]
[Consumes("application/json")]
public class AdminController(GardenContext context)
    : ControllerBase
{
    private readonly GardenContext _gardenContext = context;

    /// <summary>
    ///     Get add products
    /// </summary>
    /// <returns>All products</returns>
    [AdminAuthorized]
    [HttpGet("products", Name = "GetAllProducts")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ArrayVariantDto), StatusCodes.Status200OK)]
    public IActionResult GetAllProducts([FromQuery] [Required] int pageNumber, [FromQuery] int pageSize = 10)
    {
        var results = _gardenContext.Variants.Include(x => x.Family).ThenInclude(x => x.Category)
            .Select(x => new VariantDto
            {
                CategoryId = x.Family.Category.Id,
                CategoryImage = x.Family.Category.Image,
                CategoryName = x.Family.Category.Label,
                Description = x.Family.Description,
                DescriptionSource = x.Family.DescriptionSource,
                FamilyId = x.Family.Id,
                FamilyName = x.Family.Designation.Name,
                FamilyImage = x.Family.Designation.Image,
                Image = x.Designation.Image,
                ImageSource = x.Designation.ImageSource,
                Name = x.Designation.Name,
                MaxMaturationDaysCount = x.MaxMaturationDaysCount,
                MinMaturationDaysCount = x.MinMaturationDaysCount,
                Id = x.Id,
                HarvestMonths = x.HarvestMonths,
                SowingMonths = x.SowingMonths,
                GerminationMinimalTemperature = x.Family.GerminationMinimalTemperature,
                GerminationOptimaleTemperature = x.Family.GerminationOptimaleTemperature,
                IdealGrowingTemperature = x.Family.IdealGrowingTemperature,
                MaximumRisingTime = x.Family.MaximumRisingTime,
                MinimalRisingTime = x.Family.MinimalRisingTime,
                ZeroVegetation = x.Family.ZeroVegetation,
                SunshineDuration = x.Family.SunshineDuration
            })
            .AsNoTracking().AsQueryable();

        if (!results.Any())
            return NotFound("No products");

        return Ok(new ArrayVariantDto
        {
            Count = results.Count(),
            PageNumber = pageNumber,
            PageSize = pageSize,
            Datas = [.. results.Skip(pageNumber * pageSize).Take(pageSize)]
        });
    }

    /// <summary>
    ///     Get all families
    /// </summary>
    /// <returns>List of families</returns>
    [AdminAuthorized]
    [HttpGet("families", Name = "GetAllFamilies")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ArrayFamilyDto), StatusCodes.Status200OK)]
    public IActionResult GetAllFamilies([FromQuery] [Required] int pageNumber, [FromQuery] int pageSize = 10)
    {
        var results = _gardenContext.Families.Include(x => x.Category)
            .Select(x => new FamilyDto
            {
                Id = x.Id,
                Description = x.Description,
                DescriptionSource = x.DescriptionSource,
                Image = x.Designation.Image,
                ImageSource = x.Designation.ImageSource,
                Name = x.Designation.Name,
                CategoryId = x.Category.Id,
                CategoryImage = x.Category.Image,
                CategoryName = x.Category.Label,
                GerminationMinimalTemperature = x.GerminationMinimalTemperature,
                GerminationOptimaleTemperature = x.GerminationOptimaleTemperature,
                IdealGrowingTemperature = x.IdealGrowingTemperature,
                MaximumRisingTime = x.MaximumRisingTime,
                MinimalRisingTime = x.MinimalRisingTime,
                ZeroVegetation = x.ZeroVegetation,
                SunshineDuration = x.SunshineDuration
            })
            .AsNoTracking().AsQueryable();

        if (!results.Any())
            return NotFound("No families");

        return Ok(new ArrayFamilyDto
        {
            Count = results.Count(),
            PageNumber = pageNumber,
            PageSize = pageSize,
            Datas = [.. results.Skip(pageNumber * pageSize).Take(pageSize)]
        });
    }

    /// <summary>
    ///     Add new family
    /// </summary>
    /// <returns>Id of the new family</returns>
    [AdminAuthorized]
    [HttpPost("families", Name = "AddNewFamily")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
    public async Task<IActionResult> AddNewFamily([FromBody] FamilyDto familyDto)
    {
        var category = await _gardenContext.Categories.SingleOrDefaultAsync(c => c.Id == familyDto.CategoryId);
        if (category == null) return NotFound("Category does not exist");

        var newId = Guid.NewGuid();
        await _gardenContext.AddAsync(new Family
        {
            Id = newId,
            CreationDate = DateTime.Now,
            UpdateDate = DateTime.Now,
            Description = familyDto.Description,
            DescriptionSource = familyDto.DescriptionSource,
            Designation = new Designation
            {
                Name = familyDto.Name,
                Image = familyDto.Image,
                ImageSource = familyDto.ImageSource
            },
            Category = category,
            GerminationMinimalTemperature = familyDto.GerminationMinimalTemperature,
            GerminationOptimaleTemperature = familyDto.GerminationOptimaleTemperature,
            IdealGrowingTemperature = familyDto.IdealGrowingTemperature,
            MaximumRisingTime = familyDto.MaximumRisingTime,
            MinimalRisingTime = familyDto?.MinimalRisingTime,
            ZeroVegetation = familyDto?.ZeroVegetation,
            SunshineDuration = familyDto?.SunshineDuration
        });
        await _gardenContext.SaveChangesAsync();

        return Created("", newId);
    }

    /// <summary>
    ///     Remove a family
    /// </summary>
    /// <param name="familyId">Id of the family</param>
    /// <returns>Nothing</returns>
    [AdminAuthorized]
    [HttpDelete("families/{familyId:guid}", Name = "DeleteFamily")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteFamily([FromRoute] Guid familyId)
    {
        var existingFamily = await _gardenContext.Families.SingleOrDefaultAsync(f => f.Id == familyId);
        if (existingFamily == null) return NotFound("Family does not exist");

        _gardenContext.Remove(existingFamily);

        await _gardenContext.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>
    ///     Update a family
    /// </summary>
    /// <param name="familyId">Id of the family</param>
    /// <param name="familyDto">Datas the family</param>
    /// <returns>Nothing</returns>
    [AdminAuthorized]
    [HttpPut("families/{familyId:guid}", Name = "UpdateFamily")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> UpdateFamily([FromRoute] Guid familyId, [FromBody] FamilyDto familyDto)
    {
        var category = await _gardenContext.Categories.SingleOrDefaultAsync(c => c.Id == familyDto.CategoryId);
        if (category == null) return NotFound("Category does not exist");

        var existingFamily = await _gardenContext.Families.SingleOrDefaultAsync(f => f.Id == familyId);
        if (existingFamily == null) return NotFound("Family does not exist");

        existingFamily.Description = familyDto.Description;
        existingFamily.DescriptionSource = familyDto.DescriptionSource;
        existingFamily.Designation.Name = familyDto.Name;
        existingFamily.Designation.Image = familyDto.Image;
        existingFamily.Designation.ImageSource = familyDto.ImageSource;
        existingFamily.Category = category;
        existingFamily.GerminationOptimaleTemperature = familyDto?.GerminationOptimaleTemperature;
        existingFamily.IdealGrowingTemperature = familyDto?.IdealGrowingTemperature;
        existingFamily.GerminationMinimalTemperature = familyDto?.GerminationMinimalTemperature;
        existingFamily.MaximumRisingTime = familyDto?.MaximumRisingTime;
        existingFamily.MinimalRisingTime = familyDto?.MinimalRisingTime;
        existingFamily.ZeroVegetation = familyDto?.ZeroVegetation;
        existingFamily.SunshineDuration = familyDto?.SunshineDuration;
        existingFamily.UpdateDate = DateTime.Now;

        await _gardenContext.SaveChangesAsync();

        return NoContent();
    }


    /// <summary>
    ///     Add new products
    /// </summary>
    /// <returns>Id of the new product</returns>
    [AdminAuthorized]
    [HttpPost("families/{familyId}/products", Name = "AddNewProduct")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
    public async Task<IActionResult> AddNewProducts([FromRoute] Guid familyId, [FromBody] VariantDto variantDto)
    {
        var family = await _gardenContext.Families.SingleOrDefaultAsync(c => c.Id.Equals(familyId));
        if (family == null) return NotFound("Family does not exist");

        var newId = Guid.NewGuid();
        var newVariant = new Variant
        {
            Id = newId,
            CreationDate = DateTime.Now,
            UpdateDate = DateTime.Now,
            Designation = new Designation
            {
                Name = variantDto.Name,
                Image = variantDto.Image,
                ImageSource = variantDto.ImageSource
            },
            Family = family,
            HarvestMonths = variantDto.HarvestMonths,
            SowingMonths = variantDto.SowingMonths,
            MaxMaturationDaysCount = variantDto.MaxMaturationDaysCount,
            MinMaturationDaysCount = variantDto.MinMaturationDaysCount
        };

        await _gardenContext.AddAsync(newVariant);
        await _gardenContext.SaveChangesAsync();

        return Created("", newId);
    }


    /// <summary>
    ///     Update existing product
    /// </summary>
    /// <returns>Product updated</returns>
    [AdminAuthorized]
    [HttpPut("products/{productId:guid}", Name = "UpdateProduct")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(Variant), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateProduct([FromBody] VariantDto variantDto, [FromRoute] Guid productId)
    {
        var existingProduct = await _gardenContext.Variants.Include(x => x.Family).ThenInclude(x => x.Category)
            .Where(x => x.Id == productId).SingleOrDefaultAsync();
        var existingFamily = await _gardenContext.Families
            .Where(x => x.Id == variantDto.FamilyId).SingleOrDefaultAsync();

        if (existingProduct == null)
            return NotFound("Product does not exist");
        if (existingFamily == null)
            return NotFound("Family does not exist");

        existingProduct.UpdateDate = DateTime.Now;

        existingProduct.Designation.Name = variantDto.Name;
        existingProduct.Designation.Image = variantDto.Image;
        existingProduct.Designation.ImageSource = variantDto.ImageSource;
        existingProduct.SowingMonths = variantDto.SowingMonths;
        existingProduct.HarvestMonths = variantDto.HarvestMonths;
        existingProduct.MinMaturationDaysCount = variantDto.MinMaturationDaysCount;
        existingProduct.MaxMaturationDaysCount = variantDto.MaxMaturationDaysCount;
        existingProduct.Family = await _gardenContext.Families.SingleAsync(x => x.Id == variantDto.FamilyId);

        await _gardenContext.SaveChangesAsync();

        return Ok(existingProduct);
    }


    /// <summary>
    ///     Remove a product
    /// </summary>
    /// <param name="variantId">Id of the product</param>
    /// <returns>Nothing</returns>
    [AdminAuthorized]
    [HttpDelete("products/{variantId:guid}", Name = "DeleteProduct")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteProduct([FromRoute] Guid variantId)
    {
        var existingProduct = await _gardenContext.Variants.SingleOrDefaultAsync(f => f.Id == variantId);
        if (existingProduct == null) return NotFound("Variant does not exist");

        _gardenContext.Remove(existingProduct);

        await _gardenContext.SaveChangesAsync();
        return NoContent();
    }
}