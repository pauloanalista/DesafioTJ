using Ilovecode.EFCore.RepositoryBase;
using Tribunal.Domain.Entities;

namespace Tribunal.Domain.Interfaces.Repositories
{
    public interface IRepositoryUsuario : IRepositoryBase<Usuario> { }
    public interface IRepositoryEmpresa : IRepositoryBase<Empresa> { }
}
