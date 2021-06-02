using Mercado.Domain.Entities;
using Mercado.Infra.Data.Interface.Base;

namespace Mercado.Infra.Data.Interface
{
   public interface IProductRepository : IAsyncRepository<Product>
    {
    }
}
