using MediatR;
using prmToolkit.NotificationPattern;
using prmToolkit.NotificationPattern.Extensions;
using Tribunal.Domain.Interfaces.Repositories;
using Tribunal.Domain.Resources;
using System.Threading;
using System.Threading.Tasks;

namespace Tribunal.Domain.Commands.Usuario.AdicionarUsuario
{
    public class AdicionarUsuarioHandler : Notifiable, IRequestHandler<AdicionarUsuarioRequest, Response>
    {
        private readonly IMediator _mediator;
        private readonly IRepositoryUsuario _repositoryUsuario;
        private readonly IRepositoryEmpresa _repositoryEmpresa;

        public AdicionarUsuarioHandler(IMediator mediator, IRepositoryUsuario repositoryUsuario, IRepositoryEmpresa repositoryEmpresa)
        {
            _mediator = mediator;
            _repositoryUsuario = repositoryUsuario;
            _repositoryEmpresa = repositoryEmpresa;
        }

        public async Task<Response> Handle(AdicionarUsuarioRequest request, CancellationToken cancellationToken)
        {
            if (request==null)
            {
                AddNotification("Resquest", MSG.OBJETO_X0_E_OBRIGATORIO.ToFormat("Usuário"));
                return new Response(this);
            }
            
            //Verificar se o usuário já existe
            if (_repositoryUsuario.Exists(x=>x.Email==request.Email))
            {
                AddNotification("Email", MSG.ESTE_X0_JA_EXISTE.ToFormat("E-mail"));
                return new Response(this);
            }

            Entities.Empresa empresa = _repositoryEmpresa.GetBy(x => x.Id == request.IdEmpresa);

            if (empresa == null)
            {
                AddNotification("Empresa", MSG.X0_E_OBRIGATORIO.ToFormat("Empresa"));
                return new Response(this);
            }

            Entities.Usuario usuario = new Entities.Usuario(empresa, request.Nome, request.Matricula, request.DataNascimento, request.Email, request.Senha, request.Origem);
            AddNotifications(usuario);

            if (IsInvalid())
            {
                return new Response(this);
            }

            _repositoryUsuario.Add(usuario);

            //Criar meu objeto de resposta
            var response = new Response(this, usuario);

            AdicionarUsuarioNotification adicionarUsuarioNotification = new AdicionarUsuarioNotification(usuario);

            await _mediator.Publish(adicionarUsuarioNotification);

            return await Task.FromResult(response);
        }
    }
}
