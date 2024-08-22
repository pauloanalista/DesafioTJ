﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using prmToolkit.NotificationPattern;
using prmToolkit.NotificationPattern.Extensions;
using Tribunal.Domain.Interfaces.Repositories;
using Tribunal.Domain.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using prmToolkit.EnumExtension;

namespace Tribunal.Domain.Commands.Usuario.ListarUsuario
{
    public class ListarUsuarioHandler : Notifiable, IRequestHandler<ListarUsuarioRequest, Response>
    {
        private readonly IMediator _mediator;
        private readonly IRepositoryUsuario _repositoryUsuario;

        public ListarUsuarioHandler(IMediator mediator, IRepositoryUsuario repositoryUsuario)
        {
            _mediator = mediator;
            _repositoryUsuario = repositoryUsuario;
        }

        public async Task<Response> Handle(ListarUsuarioRequest request, CancellationToken cancellationToken)
        {
            //Valida se o objeto request esta nulo
            if (request == null)
            {
                AddNotification("Request", MSG.OBJETO_X0_E_OBRIGATORIO.ToFormat("Request"));
                return new Response(this);
            }

            var usuarioCollection = _repositoryUsuario.GetAll().AsNoTracking().Select(x => new { Id = x.Id, Nome = x.Nome, Email = x.Email, Status = x.Status.GetDescription(), Origem=x.Origem.GetName()}).ToList();


            //Cria objeto de resposta
            var response = new Response(this, usuarioCollection);

            ////Retorna o resultado
            return await Task.FromResult(response);
        }
    }
}
