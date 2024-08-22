using Microsoft.EntityFrameworkCore;
using prmToolkit.NotificationPattern;
using Tribunal.Domain.Entities;
using Tribunal.Infra.Repositories.Map;

namespace Tribunal.Infra.Repositories.Base
{
    public partial class AppDbContext : DbContext
    {
        //Criar as tabelas
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Empresa> Empresa { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) //comentar ao criar o banco
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(@"DataSource=C:\dev\paulo\pocs\Tribunal\Tribunal.Api\tribunal.db;Cache=Shared");
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //ignorar classes
            modelBuilder.Ignore<Notification>();
            //modelBuilder.Ignore<Nome>();
            //modelBuilder.Ignore<Email>();

            //aplicar configurações

            modelBuilder.ApplyConfiguration(new MapUsuario());
            modelBuilder.ApplyConfiguration(new MapEmpresa());

            base.OnModelCreating(modelBuilder);
        }


    }
}
