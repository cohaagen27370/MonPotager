using System.ComponentModel;
using api.Data.Entities.Catalog;

namespace api.Controllers.Products.dto
{
    public class ArrayProductDto
    {
        public required int PageSize { get; set; } = 10;
        public required int PageNumber { get; set; } = 1;
        public required int Count { get; set; } = 0;

        public double PageCount => Math.Ceiling(Count * 1.0 / (PageSize * 1.0));

        public required List<Family> Datas { get; set; } = [];
    }
}