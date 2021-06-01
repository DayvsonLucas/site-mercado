using Mercado.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Mercado.Infra.Data.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
    }
}
