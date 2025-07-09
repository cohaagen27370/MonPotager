using System.ComponentModel;

namespace api.Controllers.Products.dto
{
    public class ProductWithVarietyDto : ProductWithNameDto
    {
        public Guid Id { get; set; }
        public string Variety { get; set; } = string.Empty;
    }
}