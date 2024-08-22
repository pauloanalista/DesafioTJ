using Tribunal.Infra.Repositories.Base;
using Tribunal.Domain.Entities;
using Tribunal.Domain.Interfaces.Repositories;
using Ilovecode.EFCore.RepositoryBase;

namespace Tribunal.Infra.Repositories
{
    public class RepositoryUsuario : RepositoryBase<Usuario>, IRepositoryUsuario
    {
        private readonly AppDbContext _context;
        public RepositoryUsuario(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
