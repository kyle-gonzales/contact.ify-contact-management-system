namespace Contact.ify.DataAccess.Repositories;

public interface IRepository<TEntity> where TEntity : class
{
    void Add(TEntity entity);
    Task<TEntity?> GetAsync(int id);
    Task<ICollection<TEntity>> GetAllAsync();
}