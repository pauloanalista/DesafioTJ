
using Tribunal.Infra.Repositories.Base;
using Tribunal.Domain.Entities;
using Tribunal.Domain.Interfaces.Repositories;
using Ilovecode.EFCore.RepositoryBase;

namespace Tribunal.Infra.Repositories
{
    public class RepositoryEmpresa : RepositoryBase<Empresa>, IRepositoryEmpresa
    {
        private readonly AppDbContext _context;
        public RepositoryEmpresa(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
