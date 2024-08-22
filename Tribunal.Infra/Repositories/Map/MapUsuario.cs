using Tribunal.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tribunal.Infra.Repositories.Map
{
    public class MapUsuario : IEntityTypeConfiguration<Usuario>
    {

        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("Usuario");

            ////Propriedades
            builder.HasKey(x => x.Id).HasName("ID_USU");
            builder.Property(x => x.Nome).HasMaxLength(200).IsRequired().HasColumnName("NOME_USU");
            builder.Property(x => x.Matricula).HasMaxLength(100).HasColumnName("MATR_USU"); //TODO: Colocar como Unique
            builder.Property(x => x.Email).HasMaxLength(200).IsRequired().HasColumnName("DATA_NASC");
            builder.Property(x => x.Senha).HasMaxLength(34).IsRequired().HasColumnName("SENHA");
            builder.Property(x => x.DataNascimento).IsRequired().HasColumnName("EMAIL");
            builder.Property(x => x.Origem).IsRequired().HasColumnName("ORIGEM");
            builder.Property(x => x.Status).IsRequired().HasColumnName("STATUS");

            //Foreikey
            builder.HasOne(x => x.Empresa).WithMany().HasForeignKey("Id_EMP");
        }
    }
}
