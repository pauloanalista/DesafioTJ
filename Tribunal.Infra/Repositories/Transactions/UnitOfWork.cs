using Tribunal.Infra.Repositories.Base;

namespace Tribunal.Infra.Repositories.Transactions
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        protected UnitOfWork()
        {

        }
        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
