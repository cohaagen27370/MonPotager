using System.ComponentModel;

namespace api.Controllers.Stocks.dto
{

    public class StockQuantityDto
    {
        public required decimal RemainingQuantity { get; set; }
    }
}
