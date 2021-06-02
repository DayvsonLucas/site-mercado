using System;

namespace Mercado.Domain.Core.Models
{
    public abstract class Entity
    {
        protected Entity()
        {
            Id = Guid.NewGuid();
            CreateDate = DateTime.Now;
        }
        public Guid Id { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool IsDeleted { get; set; } = false;
        public override string ToString()
        {
            return GetType().Name + " [Id=" + Id + "]";
        }
    }
}
