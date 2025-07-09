using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using api.Controllers.Products.dto;

namespace api.Controllers.Stocks.dto
{

    public class StockDto
    {
        public Guid Id { get; set; }
        public List<PackageDto> Packages { get; set; } = [];

        [Required]
        public ProductWithVarietyDto Product { get; set; } = new();
    }
}
