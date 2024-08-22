using System.ComponentModel;

namespace Tribunal.Domain.Enums.Usuario
{
    public enum EnumOrigem
    {
        [Description("M")]
        Magistrado =1,
        [Description("F")]
        Funcionario =2,
        [Description("T")]
        Terceirizado =3,
        [Description("A")]
        Aposentado =4,
        [Description("P")]
        Pensionista =5,
        [Description("C")]
        Cotista =6,
        [Description("E")]
        Externo =7
    }
}
