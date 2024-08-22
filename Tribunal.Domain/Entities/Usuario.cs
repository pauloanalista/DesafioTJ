using prmToolkit.NotificationPattern;
using Tribunal.Domain.Entities.Base;
using Tribunal.Domain.Enums.Usuario;
using Tribunal.Domain.Extensions;
using System;

namespace Tribunal.Domain.Entities
{
    public class Usuario : EntityBase
    {
        public Usuario(Empresa empresa, string nome, string matricula, DateTime dataNascimento, string email, string senha, EnumOrigem origem)
        {
            Empresa = empresa;
            Nome = nome;
            Matricula = matricula;
            DataNascimento = dataNascimento;
            Email = email;
            Senha = senha;
            Origem = origem;

            new AddNotifications<Usuario>(this)
               .IfNullOrInvalidLength(x => x.Nome, 1, 150)
               .IfNotEmail(x => x.Email)
               .IfNullOrInvalidLength(x => x.Senha, 1, 32)
               .IfEnumInvalid(x => x.Origem)
            ;

            if (!string.IsNullOrEmpty(this.Senha))
            {
                this.Senha = Senha.ConvertToMD5();
            }

            Status = EnumStatus.Ativo;
            //Status = EnumStatus.Inativo;
        }

        protected Usuario()
        {

        }

        public Empresa Empresa { get; private set; }
        public string Nome { get; private set; }
        public string Matricula { get; private set; }
        public DateTime DataNascimento { get; private set; }
        public string Email { get; private set; }
        public string Senha { get; private set; }
        public EnumOrigem Origem { get; private set; }
        public EnumStatus Status { get; private set; }


    }
}
