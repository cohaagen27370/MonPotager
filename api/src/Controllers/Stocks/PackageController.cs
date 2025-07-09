using System.ComponentModel.DataAnnotations;
using api.Attributes;
using api.Controllers.Stocks.dto;
using api.Data;
using api.Data.Dto;
using api.Data.Entities.StocksManaging;
using api.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers.Stocks
{
    /// <summary>
    /// packages management controller
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("/v{version:apiVersion}")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public partial class PackageController(ILogger<PackageController> logger, GardenContext context) : ControllerBase
    {
        private readonly ILogger<PackageController> _logger = logger;
        private readonly GardenContext _gardenContext = context;

        /// <summary>
        /// Add a new package in stock
        /// </summary>
        /// <param name="stockId">id of the stock</param>
        /// <param name="package">package datas</param>
        /// <returns>new package id</returns>
        [UserAuthorized]
        [HttpPost("stock/{stockId:guid}/package", Name = "AddNewPackageInStock")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        public async Task<IActionResult> AddNewPackage([Required(ErrorMessage = "stockId is required")][FromRoute] Guid stockId, [FromBody] PackageDto package)
        {
            var userId = HttpContext.Me();

            var stock = await _gardenContext.Stocks
                                .Include(x => x.Variant)
                                .Include(x => x.Packages)
                                .Where(x => x.Id == stockId && x.User.Id == userId).FirstOrDefaultAsync();

            if (stock == null)
            {
                return BadRequest("Stock does not exists");
            }

            var newPackage = new Package()
            {
                Id = Guid.NewGuid(),
                CreationDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                ExpirationDate = DateOnly.FromDateTime(package.ExpirationDate),
                PurchaseDate = DateOnly.FromDateTime(package.PurchaseDate),
                RemainingQuantity = package.RemainingQuantity
            };

            await _gardenContext.Packages.AddAsync(newPackage);
            await _gardenContext.SaveChangesAsync();

            stock.UpdateDate = DateTime.Now;
            stock.Packages.Add(newPackage);

            await _gardenContext.SaveChangesAsync();

            return Created("", newPackage.Id);
        }


        /// <summary>
        /// Update a package in stock
        /// </summary>
        /// <param name="packageId">id of the package</param>
        /// <param name="stockQuantityDto">updated datas</param>
        /// <returns>nothing</returns>
        [UserAuthorized]
        [HttpPatch("package/{packageId:guid}", Name = "UpdatePackage")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> UpdatePackage([Required(ErrorMessage = "packageId is required")][FromRoute] Guid packageId, [FromBody] StockQuantityDto stockQuantityDto)
        {
            var package = await _gardenContext.Packages.Where(x => x.Id == packageId).FirstOrDefaultAsync();

            if (package == null)
            {
                return BadRequest("Stock does not exists");
            }

            if (stockQuantityDto.RemainingQuantity > 0)
            {
                package.RemainingQuantity = stockQuantityDto.RemainingQuantity;
                await _gardenContext.SaveChangesAsync();
            }
            else
            {
                _gardenContext.Packages.Remove(package);
                await _gardenContext.SaveChangesAsync();

                if (await _gardenContext.Stocks.AnyAsync(x => x.Packages.Count == 0))
                {
                    _gardenContext.Stocks.RemoveRange(await _gardenContext.Stocks.Where(x => x.Packages.Count == 0).ToListAsync());
                    await _gardenContext.SaveChangesAsync();
                }

            }

            return NoContent();
        }

    }
}
