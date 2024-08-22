using MediatR;
using prmToolkit.NotificationPattern;

namespace Tribunal.Domain.Commands.Empresa.AdicionarUsuario
{
    public class AdicionarEmpresaRequest : IRequest<Response>
    {
        public string Nome { get; set; }
        public string CNPJ { get; set; }
    }
}
