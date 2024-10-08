﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Tribunal.Infra.Repositories.Base;

namespace Tribunal.Infra.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.17");

            modelBuilder.Entity("Tribunal.Domain.Entities.Empresa", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("CNPJ")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("TEXT");

                    b.HasKey("Id")
                        .HasName("ID_EMP");

                    b.ToTable("Empresa");
                });

            modelBuilder.Entity("Tribunal.Domain.Entities.Usuario", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataNascimento")
                        .HasColumnType("TEXT")
                        .HasColumnName("EMAIL");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("TEXT")
                        .HasColumnName("DATA_NASC");

                    b.Property<Guid?>("Id_EMP")
                        .HasColumnType("TEXT");

                    b.Property<string>("Matricula")
                        .HasMaxLength(100)
                        .HasColumnType("TEXT")
                        .HasColumnName("MATR_USU");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("TEXT")
                        .HasColumnName("NOME_USU");

                    b.Property<int>("Origem")
                        .HasColumnType("INTEGER")
                        .HasColumnName("ORIGEM");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(34)
                        .HasColumnType("TEXT")
                        .HasColumnName("SENHA");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER")
                        .HasColumnName("STATUS");

                    b.HasKey("Id")
                        .HasName("ID_USU");

                    b.HasIndex("Id_EMP");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("Tribunal.Domain.Entities.Usuario", b =>
                {
                    b.HasOne("Tribunal.Domain.Entities.Empresa", "Empresa")
                        .WithMany()
                        .HasForeignKey("Id_EMP");

                    b.Navigation("Empresa");
                });
#pragma warning restore 612, 618
        }
    }
}
