using System.ComponentModel;

namespace api.Controllers.Products.dto
{

    public class ProductWithNameDto
    {
        public string Name { get; set; } = string.Empty;

        public string Image { get; set; } = string.Empty;

        public CategoryDto Category { get; set; } = new();
    }
}