using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Tribunal.Infra.Migrations
{
    public partial class CriandoBanco : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Empresa",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", maxLength: 150, nullable: false),
                    CNPJ = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("ID_EMP", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Id_EMP = table.Column<Guid>(type: "TEXT", nullable: true),
                    NOME_USU = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    MATR_USU = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    EMAIL = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DATA_NASC = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    SENHA = table.Column<string>(type: "TEXT", maxLength: 34, nullable: false),
                    ORIGEM = table.Column<int>(type: "INTEGER", nullable: false),
                    STATUS = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("ID_USU", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Usuario_Empresa_Id_EMP",
                        column: x => x.Id_EMP,
                        principalTable: "Empresa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_Id_EMP",
                table: "Usuario",
                column: "Id_EMP");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Empresa");
        }
    }
}
