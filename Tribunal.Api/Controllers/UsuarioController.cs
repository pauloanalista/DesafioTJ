using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Tribunal.Domain.Commands.Usuario.AdicionarUsuario;
using Tribunal.Domain.Commands.Usuario.AutenticarUsuario;
using Tribunal.Domain.Commands.Usuario.ListarUsuario;
using Tribunal.Domain.Enums.Usuario;
using Tribunal.Infra.Repositories.Transactions;

namespace Tribunal.Api.Controllers
{
    public class UsuarioController : Base.ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UsuarioController(IMediator mediator, IUnitOfWork unitOfWork, IConfiguration configuration, IHttpContextAccessor httpContextAccessor) : base(unitOfWork, mediator, configuration, httpContextAccessor)
        {
            _mediator = mediator;
            _httpContextAccessor = httpContextAccessor;
        }

        protected UsuarioController()
        {

        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/Usuario/Adicionar")]
        public async Task<IActionResult> Adicionar([FromBody] AdicionarUsuarioRequest request)
        {
            try
            {
                var response = await _mediator.Send(request, CancellationToken.None);
                return await ResponseAsync(response);
            }
            catch (System.Exception ex)
            {
                //AdiconarLog(ex);

                return BadRequest(ex.Message);
            }



        }

      


        [AllowAnonymous]
        [HttpPost]
        [Route("api/Usuario/Autenticar")]
        public async Task<IActionResult> Autenticar(
           [FromBody] AutenticarUsuarioRequest request,
           [FromServices] IUnitOfWork unitOfWork)
        {

            try
            {
                var usuario = await _mediator.Send(request, CancellationToken.None);

                if (usuario.Autenticado == true)
                {
                    usuario.Token = GerarToken(usuario);

                    return Ok(new { Autenticado = usuario.Autenticado, Mensagem = usuario.Mensagem, Token = usuario.Token, Nome = usuario.Nome });
                }

                

                return Ok(usuario);

            }
            catch (System.Exception ex)
            {
                //AdiconarLog(ex);

                return NotFound(ex.Message);
            }
        }

       

        [Authorize]
        [HttpGet]
        [Route("api/Usuario/Listar")]
        public async Task<IActionResult> ListarConfiguracao()
        {
            try
            {
                var request = new ListarUsuarioRequest();
                var result = await _mediator.Send(request, CancellationToken.None);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                //AdiconarLog(ex);

                return NotFound(ex.Message);
            }
        }
        private string GerarToken(AutenticarUsuarioResponse autenticarUsuarioResponse)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Settings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    //new Claim(ClaimTypes.Name, autenticarClienteResponse.Username.ToString()),
                    //new Claim(ClaimTypes.Role, autenticarClienteResponse.Role.ToString())
                     new Claim("Usuario", JsonConvert.SerializeObject(autenticarUsuarioResponse))
                }),
                Expires = DateTime.UtcNow.AddYears(1),
                //Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    

        [HttpGet("api/Usuario/EnumStatus")]
        public IActionResult EnumStatus()
        {
            return Ok(ListarEnum<EnumStatus>());
        }

        [HttpGet("api/Usuario/Origem")]
        public IActionResult EnumOrigem()
        {
            return Ok(ListarEnum<EnumOrigem>());
        }
    }
}
