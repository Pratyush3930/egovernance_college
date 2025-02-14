using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_egov.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedBillModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "TotalAmount",
                table: "BillModels",
                type: "decimal(10,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "BillModels");
        }
    }
}
