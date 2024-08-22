using MediatR;
using Microsoft.EntityFrameworkCore;
using prmToolkit.NotificationPattern;
using prmToolkit.NotificationPattern.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Tribunal.Domain.Commands.Empresa.ListarEmpresa;
using Tribunal.Domain.Interfaces.Repositories;
using Tribunal.Domain.Resources;

namespace Tribunal.Domain.Commands.Empresa.ListarEmpresa
{
    public class ListarEmpresaHandler : Notifiable, IRequestHandler<ListarEmpresaRequest, Response>
    {
        private readonly IMediator _mediator;
        private readonly IRepositoryEmpresa _repositoryEmpresa;

        public ListarEmpresaHandler(IMediator mediator, IRepositoryEmpresa repositoryEmpresa)
        {
            _mediator = mediator;
            _repositoryEmpresa = repositoryEmpresa;
        }

        public async Task<Response> Handle(ListarEmpresaRequest request, CancellationToken cancellationToken)
        {
            //Valida se o objeto request esta nulo
            if (request == null)
            {
                AddNotification("Request", MSG.OBJETO_X0_E_OBRIGATORIO.ToFormat("Request"));
                return new Response(this);
            }

            var empresaCollection = _repositoryEmpresa.GetAll().AsNoTracking().ToList();


            //Cria objeto de resposta
            var response = new Response(this, empresaCollection);

            ////Retorna o resultado
            return await Task.FromResult(response);
        }
    }
}
