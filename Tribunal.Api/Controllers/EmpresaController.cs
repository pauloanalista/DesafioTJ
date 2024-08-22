using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading;
using System.Threading.Tasks;
using Tribunal.Domain.Commands.Empresa.AdicionarUsuario;
using Tribunal.Domain.Commands.Empresa.ListarEmpresa;
using Tribunal.Domain.Commands.Usuario.ListarUsuario;
using Tribunal.Infra.Repositories.Transactions;

namespace Tribunal.Api.Controllers
{
    public class EmpresaController : Base.ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public EmpresaController(IMediator mediator, IUnitOfWork unitOfWork, IConfiguration configuration, IHttpContextAccessor httpContextAccessor) : base(unitOfWork, mediator, configuration, httpContextAccessor)
        {
            _mediator = mediator;
            _httpContextAccessor = httpContextAccessor;
        }

        protected EmpresaController()
        {

        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/Empresa/Adicionar")]
        public async Task<IActionResult> Adicionar([FromBody] AdicionarEmpresaRequest request)
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
        [HttpGet]
        [Route("api/Empresa/Listar")]
        public async Task<IActionResult> Listar()
        {
            try
            {
                var request = new ListarEmpresaRequest();
                var result = await _mediator.Send(request, CancellationToken.None);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                //AdiconarLog(ex);

                return NotFound(ex.Message);
            }
        }

    }
}
