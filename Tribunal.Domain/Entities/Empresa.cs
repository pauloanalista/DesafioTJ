using Tribunal.Domain.Entities.Base;
using prmToolkit.NotificationPattern;
using Tribunal.Domain.Enums.Usuario;

namespace Tribunal.Domain.Entities
{
    public class Empresa : EntityBase
    {
        public string Nome { get; private set; }
        public string CNPJ { get; private set; }

        protected Empresa()
        {

        }

        public Empresa(string nome, string cNPJ)
        {
            Nome = nome;
            CNPJ = cNPJ;

            new AddNotifications<Empresa>(this)
            .IfNullOrInvalidLength(x => x.Nome, 1, 150)
            .IfNotCnpj(x=>x.CNPJ)
            
         ;

        }
    }
}
