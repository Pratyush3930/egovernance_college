using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_egov.Migrations
{
    /// <inheritdoc />
    public partial class initialmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BranchModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DemandTypeModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DemandTypeModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustomerModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    DemandTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerModels_BranchModels_BranchId",
                        column: x => x.BranchId,
                        principalTable: "BranchModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomerModels_DemandTypeModels_DemandTypeId",
                        column: x => x.DemandTypeId,
                        principalTable: "DemandTypeModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RateModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DemandTypeModelId = table.Column<int>(type: "int", nullable: false),
                    RatePerUnit = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RateModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RateModels_DemandTypeModels_DemandTypeModelId",
                        column: x => x.DemandTypeModelId,
                        principalTable: "DemandTypeModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BillModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    IssueDate = table.Column<DateOnly>(type: "date", nullable: false),
                    DueDate = table.Column<DateOnly>(type: "date", nullable: false),
                    UnitsConsumed = table.Column<int>(type: "int", nullable: false),
                    Fine = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillModels_CustomerModels_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "CustomerModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaymentHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BillId = table.Column<int>(type: "int", nullable: false),
                    PaymentDate = table.Column<DateOnly>(type: "date", nullable: false),
                    AmountPaid = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentHistories_BillModels_BillId",
                        column: x => x.BillId,
                        principalTable: "BillModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillModels_CustomerId",
                table: "BillModels",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerModels_BranchId",
                table: "CustomerModels",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerModels_DemandTypeId",
                table: "CustomerModels",
                column: "DemandTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentHistories_BillId",
                table: "PaymentHistories",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_RateModels_DemandTypeModelId",
                table: "RateModels",
                column: "DemandTypeModelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminModels");

            migrationBuilder.DropTable(
                name: "PaymentHistories");

            migrationBuilder.DropTable(
                name: "RateModels");

            migrationBuilder.DropTable(
                name: "BillModels");

            migrationBuilder.DropTable(
                name: "CustomerModels");

            migrationBuilder.DropTable(
                name: "BranchModels");

            migrationBuilder.DropTable(
                name: "DemandTypeModels");
        }
    }
}
