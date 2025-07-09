using System.ComponentModel.DataAnnotations;
using api.Attributes;
using api.Controllers.Products.dto;
using api.Controllers.Stocks.dto;
using api.Data;
using api.Data.Entities.StocksManaging;
using api.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace api.Controllers.Stocks
{
    /// <summary>
    ///     Stocks management controller
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("/v{version:apiVersion}")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class StockController(GardenContext context) : ControllerBase
    {

        /// <summary>
        ///     Get a seed stock by product
        /// </summary>
        /// <param name="productId">id of the product</param>
        /// <returns>the stock</returns>
        [UserAuthorized]
        [HttpGet("stock/product/{productId:guid}", Name = "GetAStockForAProduct")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(StockDto), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetStockByProduct([Required(ErrorMessage = "stockId is required")][FromRoute] Guid productId)
        {
            var userId = HttpContext.Me();

            var stock = await context.Stocks
                .Include(x => x.Variant)
                .ThenInclude(x => x.Family)
                .ThenInclude(x => x.Category)
                .Include(x => x.Packages)
                .Include(x => x.User)
                .Where(x => x.Variant.Id == productId && x.User.Id == userId)
                .Select(x => new StockDto()
                {
                    Product = new ProductWithVarietyDto()
                    {
                        Id = x.Variant.Id,
                        Name = x.Variant.Family.Designation.Name,
                        Variety = x.Variant.Designation.Name,
                        Category = new CategoryDto()
                        {
                            Id = x.Variant.Family.Category.Id,
                            Label = x.Variant.Family.Category.Label
                        },
                        Image = x.Variant.Designation.Image
                    },
                    Packages = x.Packages.Select(p => new PackageDto()
                    {
                        Id = p.Id,
                        ExpirationDate = p.ExpirationDate.ToDateTime(TimeOnly.MinValue),
                        RemainingQuantity = p.RemainingQuantity,
                        PurchaseDate = p.PurchaseDate.ToDateTime(TimeOnly.MinValue)
                    }).ToList(),
                    Id = x.Id
                })
                .SingleOrDefaultAsync();

            return Ok(stock);
        }

        /// <summary>
        /// Get a seed stock
        /// </summary>
        /// <param name="stockId">id of the stock</param>
        /// <returns>the stock</returns>
        [UserAuthorized]
        [HttpGet("stock/{stockId:guid}", Name = "GetAStockById")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(StockDto), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetStock([Required(ErrorMessage = "stockId is required")][FromRoute] Guid stockId)
        {
            var userId = HttpContext.Me();

            var stock = await context.Stocks
                .Include(x => x.Variant)
                .ThenInclude(x => x.Family)
                .ThenInclude(x => x.Category)
                .Include(x => x.Packages)
                .Include(x => x.User)
                .Where(x => x.Id == stockId && x.User.Id == userId)
                .Select(x => new StockDto()
                {
                    Product = new ProductWithVarietyDto()
                    {
                        Id = x.Variant.Id,
                        Name = x.Variant.Family.Designation.Name,
                        Variety = x.Variant.Designation.Name,
                        Category = new CategoryDto()
                        {
                            Id = x.Variant.Family.Category.Id,
                            Label = x.Variant.Family.Category.Label
                        },
                        Image = x.Variant.Designation.Image
                    },
                    Packages = x.Packages.Select(p => new PackageDto()
                    {
                        Id = p.Id,
                        ExpirationDate = p.ExpirationDate.ToDateTime(TimeOnly.MinValue),
                        RemainingQuantity = p.RemainingQuantity,
                        PurchaseDate = p.PurchaseDate.ToDateTime(TimeOnly.MinValue)
                    }).ToList(),
                    Id = x.Id
                })
                .SingleOrDefaultAsync();

            return Ok(stock);
        }

        /// <summary>
        ///     Get all seed stock
        /// </summary>
        /// <param name="pageNumber">Number of the page</param>
        /// <param name="pageSize">Size of the page</param>
        /// <param name="notEmptyOnly">To get only stocks > 0</param>
        /// <returns>all stocks</returns>
        [UserAuthorized]
        [HttpGet("stocks", Name = "GetAllStocks")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(ArrayStockDto), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetStocks([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10,
            [FromQuery] bool notEmptyOnly = true)
        {
            var userId = HttpContext.Me();

            var stocks = context.Stocks.Include(x => x.Variant).ThenInclude(x => x.Family).ThenInclude(x => x.Category).Include(x => x.Packages).AsQueryable();
            stocks = notEmptyOnly
                ? stocks.Where(x => x.User.Id == userId && x.Packages.Sum(p => p.RemainingQuantity) > 0)
                : stocks.Where(x => x.User.Id == userId);

            var stocksDto = await stocks.Select(x => new StocksStateDto
            {
                Id = x.Id,
                ProductId = x.Variant.Id,
                ProductName = x.Variant.Family.Designation.Name,
                ProductVariety = x.Variant.Designation.Name,
                VarietyImage = x.Variant.Designation.Image,
                PackageCount = x.Packages.Count,
                SeedQuantity = x.Packages.Any() ? x.Packages.Sum(p => p.RemainingQuantity) : 0,
                HasExpiratedPackage = x.Packages.Any() &&
                                      x.Packages.Any(p => p.ExpirationDate < DateOnly.FromDateTime(DateTime.Now)),
                ExpirationDate = x.Packages.Any()
                    ? x.Packages.OrderByDescending(p => p.ExpirationDate).First().ExpirationDate.ToDateTime(TimeOnly.MinValue)
                    : DateTime.MinValue
            }).ToListAsync();

            return Ok(new ArrayStockDto()
            {
                Count = stocksDto != null ? stocksDto!.Count : 0,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Datas = stocksDto != null ? [.. stocksDto.Skip((pageNumber - 1) * pageSize).Take(pageSize)] : []
            });
        }

        /// <summary>
        /// Add a new seed stock
        /// </summary>
        /// <returns>id of the stock</returns>
        [UserAuthorized]
        [HttpPost("stock", Name = "AddANewStock")]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
        public async Task<IActionResult> AddNewStock([FromBody] NewStockDto newStock)
        {
            var userId = HttpContext.Me();

            var stock = await context.Stocks.SingleOrDefaultAsync(x => x.User.Id == userId && x.Variant.Id == newStock.ProductId);

            if (stock != null)
                return Conflict("Stock already exists for this product");

            var newId = Guid.NewGuid();
            await context.Stocks.AddAsync(new Stock
            {
                Id = newId,
                CreationDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                Packages = [],
                Variant = await context.Variants.SingleAsync(x => x.Id == newStock.ProductId),
                User = await context.Users.SingleAsync(x => x.Id == userId)
            });
            await context.SaveChangesAsync();

            return Created("", newId);
        }
    }

}
