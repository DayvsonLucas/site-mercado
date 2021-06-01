using Mercado.Application.ViewModels;
using Mercado.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Mercado.Application.Interface
{
    public interface IProductServices
    {
        Task<bool> Add(ProductViewModel entity);
        Task<bool> Update(ProductViewModel entity);
        Task<bool> Remove(Guid id);
        Task<ProductViewModel> GetById(Guid id);
        Task<IEnumerable<ProductViewModel>> GetWhere(Expression<Func<ProductViewModel, bool>> predicate);
        Task<IEnumerable<ProductViewModel>> GetAll();
        Task<ProductViewModel> FirstOrDefault(Expression<Func<ProductViewModel, bool>> predicate);
        Task<int> CountWhere(Expression<Func<ProductViewModel, bool>> predicate);
    }
}
