using System.ComponentModel.DataAnnotations.Schema;
using api.Data.Entities.Auth;
using api.Data.Entities.Catalog;

namespace api.Data.Entities.StocksManaging
{
    [Table("Stocks")]
    public class Stock : BaseEntite
    {
        public Variant Variant { get; set; } = new();
        public List<Package> Packages { get; set; } = [];
        public User User { get; set; } = new();
    }
}