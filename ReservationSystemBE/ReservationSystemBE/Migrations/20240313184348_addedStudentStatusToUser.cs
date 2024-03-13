﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReservationSystemBE.Migrations
{
    /// <inheritdoc />
    public partial class addedStudentStatusToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsStudent",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsStudent",
                table: "Users");
        }
    }
}
