using Tribunal.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tribunal.Infra.Repositories.Map
{
    public class MapEmpresa : IEntityTypeConfiguration<Empresa>
    {

        public void Configure(EntityTypeBuilder<Empresa> builder)
        {
            builder.ToTable("Empresa");

            ////Propriedades
            builder.HasKey(x => x.Id).HasName("ID_EMP");
            builder.Property(x => x.Nome).HasMaxLength(150).IsRequired();
        }
    }
}
