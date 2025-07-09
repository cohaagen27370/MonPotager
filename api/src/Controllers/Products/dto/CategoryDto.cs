using System.ComponentModel;

namespace api.Controllers.Products.dto
{
    public class CategoryDto
    {
        public int Id { get; set; }

        public string Label { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}