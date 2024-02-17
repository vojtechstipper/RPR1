using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReservationSystemBE.Migrations
{
    /// <inheritdoc />
    public partial class ChangedPriceLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PriceLevels_Products_ProductId",
                table: "PriceLevels");

            migrationBuilder.DropIndex(
                name: "IX_PriceLevels_ProductId",
                table: "PriceLevels");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "PriceLevels");

            migrationBuilder.AddColumn<string>(
                name: "PriceLevelId",
                table: "Products",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Products_PriceLevelId",
                table: "Products",
                column: "PriceLevelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_PriceLevels_PriceLevelId",
                table: "Products",
                column: "PriceLevelId",
                principalTable: "PriceLevels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_PriceLevels_PriceLevelId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_PriceLevelId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PriceLevelId",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "ProductId",
                table: "PriceLevels",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PriceLevels_ProductId",
                table: "PriceLevels",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_PriceLevels_Products_ProductId",
                table: "PriceLevels",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
