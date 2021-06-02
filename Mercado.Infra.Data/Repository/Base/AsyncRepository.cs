using Microsoft.EntityFrameworkCore;
using Mercado.Infra.Data.Context;
using Mercado.Infra.Data.Interface.Base;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mercado.Domain.Core.Models;
using System.Linq;
using System.Linq.Expressions;

namespace Mercado.Infra.Data.Repository.Base
{
    public class AsyncRepository<TEntity> : IAsyncRepository<TEntity> where TEntity : Entity
    {
        protected readonly DataContext Context;

        public AsyncRepository(DataContext context)
        {
            Context = context;
        }

        public async Task Add(TEntity entity)
        {
            await Context.Set<TEntity>().AddAsync(entity);
            await Context.SaveChangesAsync();
        }

        public Task<int> CountAll() => Context.Set<TEntity>().Where(x => !x.IsDeleted).CountAsync();

        public Task<decimal> SumWhere(Expression<Func<TEntity, decimal>> predicate)
                => Context.Set<TEntity>().Where(x => !x.IsDeleted).SumAsync(predicate);

        public Task<int> CountWhere(Expression<Func<TEntity, bool>> predicate)
                => Context.Set<TEntity>().Where(x => !x.IsDeleted).CountAsync(predicate);

        public Task<TEntity> FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
                   => Context.Set<TEntity>().Where(x => !x.IsDeleted).FirstOrDefaultAsync(predicate);

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await Context.Set<TEntity>().Where(x => !x.IsDeleted).ToListAsync();
        }

        public async Task<TEntity> GetById(Guid id)
        {
            return await Context.Set<TEntity>().FindAsync(id);
        }

        public async Task<IEnumerable<TEntity>> GetWhere(Expression<Func<TEntity, bool>> predicate)
        {
            return await Context.Set<TEntity>().Where(x => !x.IsDeleted).Where(predicate).ToListAsync();
        }

        public Task Remove(TEntity entity)
        {
            Context.Set<TEntity>().Remove(entity);
            return Context.SaveChangesAsync();
        }

        public Task Delete(TEntity entity)
        {
            Context.Entry(entity).State = EntityState.Modified;
            Context.Entry(entity).CurrentValues["IsDeleted"] = true;
            Context.Entry(entity).CurrentValues["DeletedDate"] = DateTime.Now;

            return Context.SaveChangesAsync();
        }

        public Task Update(TEntity entity)
        {
            Context.Entry(entity).State = EntityState.Modified;
            return Context.SaveChangesAsync();
        }
    }
}
