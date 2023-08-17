using Microsoft.EntityFrameworkCore;

namespace Contact.ify.DataAccess.Repositories;

public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : class
{

    protected readonly DbContext Context;

    public Repository(DbContext context)
    {
        Context = context;
    }
    public virtual void Add(TEntity entity)
    {
        Context.Set<TEntity>().Add(entity);
    }

    public async Task<TEntity?> GetAsync(int id)
    {
        return await Context.Set<TEntity>().FindAsync(id);
    }

    public virtual async Task<ICollection<TEntity>> GetAllAsync()
    {
        return await Context.Set<TEntity>().ToListAsync();
    }

    //public abstract void Update();
}