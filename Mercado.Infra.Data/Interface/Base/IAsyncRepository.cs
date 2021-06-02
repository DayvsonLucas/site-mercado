using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Mercado.Infra.Data.Interface.Base
{
    public interface IAsyncRepository<TEntity> where TEntity : class
    {
        Task Add(TEntity obj);
        Task<TEntity> FirstOrDefault(Expression<Func<TEntity, bool>> predicate);
        Task<IEnumerable<TEntity>> GetWhere(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> GetById(Guid id);
        Task<IEnumerable<TEntity>> GetAll();
        Task Update(TEntity obj);
        Task Remove(TEntity entity);
        Task Delete(TEntity entity);
        Task<int> CountAll();
        Task<int> CountWhere(Expression<Func<TEntity, bool>> predicate);
        Task<decimal> SumWhere(Expression<Func<TEntity, decimal>> predicate);
    }
}
