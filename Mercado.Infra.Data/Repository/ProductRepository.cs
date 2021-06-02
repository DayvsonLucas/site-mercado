using Mercado.Domain.Entities;
using Mercado.Infra.Data.Context;
using Mercado.Infra.Data.Interface;
using Mercado.Infra.Data.Repository.Base;

namespace Mercado.Infra.Data.Repository
{
    public class ProductRepository : AsyncRepository<Product>, IProductRepository
    {
        public ProductRepository(DataContext context) : base(context) { }
    }
}
