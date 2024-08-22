using MediatR;
using prmToolkit.NotificationPattern;
using System;
using Tribunal.Domain.Enums.Usuario;

namespace Tribunal.Domain.Commands.Usuario.AdicionarUsuario
{
    public class AdicionarUsuarioRequest : IRequest<Response>
    {
        public string Nome { get; set; }
        public string Matricula { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public DateTime DataNascimento { get; set; }
        public EnumOrigem Origem { get; set; }

        public Guid IdEmpresa { get; set; }
    }
}
