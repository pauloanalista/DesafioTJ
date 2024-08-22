using MediatR;

namespace Tribunal.Domain.Commands.Usuario.AutenticarUsuario
{
    public class AutenticarUsuarioRequest : IRequest<AutenticarUsuarioResponse>
    {
        public AutenticarUsuarioRequest()
        {

        }
        public AutenticarUsuarioRequest(string email, string senha)
        {
            Email = email;
            Senha = senha;
        }

        
        public string Email { get; set; }
        public string Senha { get; set; }
        
    }
}
