using MediatR;
using prmToolkit.NotificationPattern;
using prmToolkit.NotificationPattern.Extensions;
using Tribunal.Domain.Interfaces.Repositories;
using Tribunal.Domain.Resources;
using System.Threading;
using System.Threading.Tasks;
using Tribunal.Domain.Commands.Empresa.AdicionarUsuario;

namespace Tribunal.Domain.Commands.Empresa.AdicionarEmpresa
{
    public class AdicionarEmpresaHandler : Notifiable, IRequestHandler<AdicionarEmpresaRequest, Response>
    {
        private readonly IMediator _mediator;
        private readonly IRepositoryEmpresa _repositoryEmpresa;

        public AdicionarEmpresaHandler(IMediator mediator, IRepositoryEmpresa repositoryEmpresa)
        {
            _mediator = mediator;
            _repositoryEmpresa = repositoryEmpresa;
        }

        public async Task<Response> Handle(AdicionarEmpresaRequest request, CancellationToken cancellationToken)
        {
            if (request == null)
            {
                AddNotification("Resquest", MSG.OBJETO_X0_E_OBRIGATORIO.ToFormat("Empresa"));
                return new Response(this);
            }

            //Verificar se o usuário já existe
            if (_repositoryEmpresa.Exists(x => x.CNPJ == request.CNPJ))
            {
                AddNotification("CNPJ", MSG.ESTE_X0_JA_EXISTE.ToFormat("CNPJ"));
                return new Response(this);
            }


            Entities.Empresa Empresa = new Entities.Empresa(request.Nome, request.CNPJ);
            AddNotifications(Empresa);

            if (IsInvalid())
            {
                return new Response(this);
            }

            _repositoryEmpresa.Add(Empresa);

            //Criar meu objeto de resposta
            var response = new Response(this, Empresa);

            //AdicionarEmpresaNotification adicionarEmpresaNotification = new AdicionarEmpresaNotification(Empresa);

            //await _mediator.Publish(adicionarEmpresaNotification);

            return await Task.FromResult(response);
        }
    }
}
