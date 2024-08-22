using MediatR;
using prmToolkit.NotificationPattern;
using Tribunal.Domain.Extensions;
using Tribunal.Domain.Interfaces.Repositories;
using System.Threading;
using System.Threading.Tasks;

namespace Tribunal.Domain.Commands.Usuario.AutenticarUsuario
{
    public class AutenticarUsuarioHandler : Notifiable, IRequestHandler<AutenticarUsuarioRequest, AutenticarUsuarioResponse>
    {
        private readonly IMediator _mediator;
        private readonly IRepositoryUsuario _repositoryUsuario;

        public AutenticarUsuarioHandler(IMediator mediator, IRepositoryUsuario repositoryUsuario)
        {
            _mediator = mediator;
            _repositoryUsuario = repositoryUsuario;
        }

        public async Task<AutenticarUsuarioResponse> Handle(AutenticarUsuarioRequest request, CancellationToken cancellationToken)
        {
            //Valida se o objeto request esta nulo
            if (request == null)
            {
                AddNotification("Request", "Request é obrigatório");
                return null;
            }

            request.Senha = request.Senha.ConvertToMD5();

            Entities.Usuario usuario = _repositoryUsuario.GetBy(x => x.Email == request.Email && x.Senha == request.Senha);

            if (usuario == null)
            {
                AddNotification("Usuario", "Usuário não encontrado.");
                return new AutenticarUsuarioResponse()
                {
                    Mensagem = "Usuário não encontrado.",
                    Autenticado = false
                };
            }

            if (usuario.Status == Enums.Usuario.EnumStatus.Inativo)
            {
                AddNotification("Request", "Usuário não está ativo no sistema.");

                return new AutenticarUsuarioResponse()
                {
                    Mensagem = usuario.Nome + " você não está ativo, comunique algum administrador do sistema e solicite sua ativação!",
                    Autenticado = false
                };
            }

            if (usuario.Status == Enums.Usuario.EnumStatus.Bloqueado)
            {
                AddNotification("Request", "Usuário bloquado no sistema.");

                return new AutenticarUsuarioResponse()
                {
                    Mensagem = "Usuário bloquado, comunique algum administrador do sistema e solicite sua ativação!",
                    Autenticado = false
                };
            }

            //Cria objeto de resposta
            var response = (AutenticarUsuarioResponse)usuario;

            ////Retorna o resultado
            return await Task.FromResult(response);
        }
    }
}
