using Mercado.Domain.Core.Models;

namespace Mercado.Domain.Entities
{
    public class Product : Entity
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public decimal UnitaryValue { get; set; }
        public byte[] Dados { get; set; }
        public string ContentType { get; set; }
    }
}
