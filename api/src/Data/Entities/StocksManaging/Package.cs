using System.ComponentModel.DataAnnotations.Schema;
using api.Data.Entities.Catalog;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Entities.StocksManaging
{
    [Table("Packages")]
    [Index(nameof(ExpirationDate), IsUnique = false)]
    [Index(nameof(PurchaseDate), IsUnique = false)]
    [Index(nameof(RemainingQuantity), IsUnique = false)]
    public class Package : BaseEntite
    {
        public DateOnly ExpirationDate { get; set; }

        [Column("RemainingQuantity", TypeName = "decimal(18,2)")]
        public decimal RemainingQuantity { get; set; }
        public DateOnly PurchaseDate { get; set; }

        public bool HasExpiratedPackage
        {
            get
            {
                return this.ExpirationDate < DateOnly.FromDateTime(DateTime.Now);
            }
        }
    }
}
