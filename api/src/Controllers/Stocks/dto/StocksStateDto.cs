using System.ComponentModel;

namespace api.Controllers.Stocks.dto
{

    public class StocksStateDto
    {
        public required Guid Id { get; set; }
        public required Guid ProductId { get; set; }
        public required string ProductName { get; set; } = string.Empty;
        public required string ProductVariety { get; set; } = string.Empty;
        public required string VarietyImage { get; set; } = string.Empty;
        public decimal SeedQuantity { get; set; }
        public int PackageCount { get; set; }
        public bool HasExpiratedPackage { get; set; }

        public DateTime ExpirationDate { get; set; }
    }
}
