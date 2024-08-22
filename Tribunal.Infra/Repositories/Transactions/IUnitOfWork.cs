namespace Tribunal.Infra.Repositories.Transactions
{
    public interface IUnitOfWork
    {
        void SaveChanges();
    }
}
