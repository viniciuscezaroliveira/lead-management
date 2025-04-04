using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Infrastructure.Migrations
{
    public partial class UpdateLeadEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContactFullName",
                table: "Leads",
                newName: "ContactLastName");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateUpdated",
                table: "Leads",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateUpdated",
                table: "Leads");

            migrationBuilder.RenameColumn(
                name: "ContactLastName",
                table: "Leads",
                newName: "ContactFullName");
        }
    }
}
