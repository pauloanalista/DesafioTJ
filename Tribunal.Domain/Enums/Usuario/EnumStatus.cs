using System.ComponentModel;

namespace Tribunal.Domain.Enums.Usuario
{
    public enum EnumStatus
    {
        [Description("Inativo")]
        Inativo =0,
        [Description("Ativo")]
        Ativo =1,
        [Description("Bloqueado")]
        Bloqueado =3,
    }
}
