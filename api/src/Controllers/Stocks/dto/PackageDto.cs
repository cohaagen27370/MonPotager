using System.ComponentModel;

namespace api.Controllers.Stocks.dto
{
    public class PackageDto
    {
        public Guid Id { get; set; }
        public required DateTime ExpirationDate { get; set; }
        public required decimal RemainingQuantity { get; set; }
        public DateTime PurchaseDate { get; set; }
    }
}
