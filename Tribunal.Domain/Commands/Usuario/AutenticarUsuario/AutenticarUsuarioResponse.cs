using Tribunal.Domain.Enums.Usuario;
using System;

namespace Tribunal.Domain.Commands.Usuario.AutenticarUsuario
{
    public class AutenticarUsuarioResponse
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public bool Autenticado { get; set; }
        public string  Mensagem { get; set; }
        public string Token { get; set; }
        public EnumOrigem Status { get; set; }

        public static explicit operator AutenticarUsuarioResponse(Entities.Usuario usuario)
        {
            return new AutenticarUsuarioResponse()
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Mensagem = "Olá " + usuario.Nome + " seja bem vindo(a).",
                Autenticado = true
            };
        }
    }
}
