using System;

namespace api.Controllers.Administration.dto;

public class ArrayFamilyDto
{
        public required int PageSize { get; set; }
        public required int PageNumber { get; set; }
        public required int Count { get; set; }

        public double PageCount
        {
            get
            {
                return Math.Ceiling((this.Count * 1.0) / (this.PageSize * 1.0));
            }
        }

        public required List<FamilyDto> Datas { get; set; } = [];
}
