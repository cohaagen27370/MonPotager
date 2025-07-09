using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Initbase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Captchas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    ActivationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Captchas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Climates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Climates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Emails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SendingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "varchar(max)", nullable: false),
                    Result = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Emails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Searches",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SearchDesignation_Name = table.Column<string>(type: "varchar(150)", nullable: false),
                    SearchDesignation_Image = table.Column<string>(type: "varchar(150)", nullable: false),
                    SearchCount = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Searches", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Families",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Designation_Name = table.Column<string>(type: "varchar(150)", nullable: false),
                    Designation_Image = table.Column<string>(type: "varchar(150)", nullable: false),
                    Description = table.Column<string>(type: "varchar(max)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    GerminationMinimalTemperature = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    GerminationOptimaleTemperature = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MinimalRisingTime = table.Column<int>(type: "int", nullable: true),
                    MaximumRisingTime = table.Column<int>(type: "int", nullable: true),
                    IdealGrowingTemperature = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ZeroVegetation = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Families", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Families_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Rank = table.Column<int>(type: "int", nullable: false),
                    IsMultiple = table.Column<bool>(type: "bit", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stages_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tendency = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Altitude = table.Column<int>(type: "int", nullable: false),
                    IsDepartment = table.Column<bool>(type: "bit", nullable: false),
                    ClimateId = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stations_Climates_ClimateId",
                        column: x => x.ClimateId,
                        principalTable: "Climates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Variants",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Designation_Name = table.Column<string>(type: "varchar(150)", nullable: false),
                    Designation_Image = table.Column<string>(type: "varchar(150)", nullable: false),
                    SowingMonths_January = table.Column<bool>(type: "bit", nullable: false),
                    SowingMonths_February = table.Column<bool>(type: "bit", nullable: false),
                    SowingMonths_March = table.Column<bool>(type: "bit", nullable: false),
                    SowingMonths_April = table.Column<bool>(type: "bit", nullable: false),
                    SowingMonths_May = table.Column<bool>(type: "bit", nullable: false),
                    SowingMonths_June = table.Column<bool>(type: "bit", nullable: false),
                    SowingMonths_July = table.Column<bool>(type: "bit", nullable: false),
                    SowingMonths_August = table.Column<bool>(type: "bit", nullable: false),
                    SowingMonths_September = table.Column<bool>(type: "bit", nullable: false),
                    SowingMonths_October = table.Column<bool>(type: "bit", nullable: false),
                    SowingMonths_November = table.Column<bool>(type: "bit", nullable: false),
                    SowingMonths_December = table.Column<bool>(type: "bit", nullable: false),
                    HarvestMonths_January = table.Column<bool>(type: "bit", nullable: false),
                    HarvestMonths_February = table.Column<bool>(type: "bit", nullable: false),
                    HarvestMonths_March = table.Column<bool>(type: "bit", nullable: false),
                    HarvestMonths_April = table.Column<bool>(type: "bit", nullable: false),
                    HarvestMonths_May = table.Column<bool>(type: "bit", nullable: false),
                    HarvestMonths_June = table.Column<bool>(type: "bit", nullable: false),
                    HarvestMonths_July = table.Column<bool>(type: "bit", nullable: false),
                    HarvestMonths_August = table.Column<bool>(type: "bit", nullable: false),
                    HarvestMonths_September = table.Column<bool>(type: "bit", nullable: false),
                    HarvestMonths_October = table.Column<bool>(type: "bit", nullable: false),
                    HarvestMonths_November = table.Column<bool>(type: "bit", nullable: false),
                    HarvestMonths_December = table.Column<bool>(type: "bit", nullable: false),
                    MinMaturationDaysCount = table.Column<int>(type: "int", nullable: false),
                    MaxMaturationDaysCount = table.Column<int>(type: "int", nullable: false),
                    FamilyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Variants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Variants_Families_FamilyId",
                        column: x => x.FamilyId,
                        principalTable: "Families",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhysicalMeasurements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    MaxTemperature = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MinTemperature = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AverageTemperature = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    StationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhysicalMeasurements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhysicalMeasurements_Stations_StationId",
                        column: x => x.StationId,
                        principalTable: "Stations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "varchar(150)", nullable: false),
                    Email = table.Column<string>(type: "varchar(255)", nullable: false),
                    Password = table.Column<string>(type: "varchar(100)", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    ResetWord = table.Column<string>(type: "varchar(20)", nullable: false),
                    ExpirationResetDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TypeUser = table.Column<int>(type: "int", nullable: false),
                    StationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Stations_StationId",
                        column: x => x.StationId,
                        principalTable: "Stations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Flows",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VariantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CurrentStageId = table.Column<int>(type: "int", nullable: false),
                    IsClosed = table.Column<bool>(type: "bit", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    NumberOfDaysSinceStart = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Flows_Stages_CurrentStageId",
                        column: x => x.CurrentStageId,
                        principalTable: "Stages",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Flows_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Flows_Variants_VariantId",
                        column: x => x.VariantId,
                        principalTable: "Variants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Stocks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VariantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stocks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Stocks_Variants_VariantId",
                        column: x => x.VariantId,
                        principalTable: "Variants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    StageId = table.Column<int>(type: "int", nullable: false),
                    FlowId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Events_Flows_FlowId",
                        column: x => x.FlowId,
                        principalTable: "Flows",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Events_Stages_StageId",
                        column: x => x.StageId,
                        principalTable: "Stages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Packages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExpirationDate = table.Column<DateOnly>(type: "date", nullable: false),
                    RemainingQuantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PurchaseDate = table.Column<DateOnly>(type: "date", nullable: false),
                    StockId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Packages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Packages_Stocks_StockId",
                        column: x => x.StockId,
                        principalTable: "Stocks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Captchas_CreationDate",
                table: "Captchas",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Captchas_Id",
                table: "Captchas",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Captchas_UpdateDate",
                table: "Captchas",
                column: "UpdateDate");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_Id",
                table: "Categories",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Climates_Id",
                table: "Climates",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Emails_CreationDate",
                table: "Emails",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Emails_Id",
                table: "Emails",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Emails_UpdateDate",
                table: "Emails",
                column: "UpdateDate");

            migrationBuilder.CreateIndex(
                name: "IX_Events_CreationDate",
                table: "Events",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Events_Date",
                table: "Events",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_Events_FlowId",
                table: "Events",
                column: "FlowId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_Id",
                table: "Events",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_StageId",
                table: "Events",
                column: "StageId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_UpdateDate",
                table: "Events",
                column: "UpdateDate");

            migrationBuilder.CreateIndex(
                name: "IX_Families_CategoryId",
                table: "Families",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Families_CreationDate",
                table: "Families",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Families_Designation_Name",
                table: "Families",
                column: "Designation_Name");

            migrationBuilder.CreateIndex(
                name: "IX_Families_Id",
                table: "Families",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Families_UpdateDate",
                table: "Families",
                column: "UpdateDate");

            migrationBuilder.CreateIndex(
                name: "IX_Flows_CreationDate",
                table: "Flows",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Flows_CurrentStageId",
                table: "Flows",
                column: "CurrentStageId");

            migrationBuilder.CreateIndex(
                name: "IX_Flows_Id",
                table: "Flows",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flows_IsClosed",
                table: "Flows",
                column: "IsClosed");

            migrationBuilder.CreateIndex(
                name: "IX_Flows_UpdateDate",
                table: "Flows",
                column: "UpdateDate");

            migrationBuilder.CreateIndex(
                name: "IX_Flows_UserId",
                table: "Flows",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Flows_VariantId",
                table: "Flows",
                column: "VariantId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_CreationDate",
                table: "Messages",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_Id",
                table: "Messages",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_UpdateDate",
                table: "Messages",
                column: "UpdateDate");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_UserId",
                table: "Messages",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Packages_CreationDate",
                table: "Packages",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Packages_ExpirationDate",
                table: "Packages",
                column: "ExpirationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Packages_Id",
                table: "Packages",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Packages_PurchaseDate",
                table: "Packages",
                column: "PurchaseDate");

            migrationBuilder.CreateIndex(
                name: "IX_Packages_RemainingQuantity",
                table: "Packages",
                column: "RemainingQuantity");

            migrationBuilder.CreateIndex(
                name: "IX_Packages_StockId",
                table: "Packages",
                column: "StockId");

            migrationBuilder.CreateIndex(
                name: "IX_Packages_UpdateDate",
                table: "Packages",
                column: "UpdateDate");

            migrationBuilder.CreateIndex(
                name: "IX_PhysicalMeasurements_CreationDate",
                table: "PhysicalMeasurements",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_PhysicalMeasurements_Id",
                table: "PhysicalMeasurements",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PhysicalMeasurements_Month",
                table: "PhysicalMeasurements",
                column: "Month");

            migrationBuilder.CreateIndex(
                name: "IX_PhysicalMeasurements_StationId",
                table: "PhysicalMeasurements",
                column: "StationId");

            migrationBuilder.CreateIndex(
                name: "IX_PhysicalMeasurements_UpdateDate",
                table: "PhysicalMeasurements",
                column: "UpdateDate");

            migrationBuilder.CreateIndex(
                name: "IX_Searches_CreationDate",
                table: "Searches",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Searches_Id",
                table: "Searches",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Searches_SearchDesignation_Name",
                table: "Searches",
                column: "SearchDesignation_Name");

            migrationBuilder.CreateIndex(
                name: "IX_Searches_UpdateDate",
                table: "Searches",
                column: "UpdateDate");

            migrationBuilder.CreateIndex(
                name: "IX_Stages_CategoryId",
                table: "Stages",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Stages_Id",
                table: "Stages",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stations_ClimateId",
                table: "Stations",
                column: "ClimateId");

            migrationBuilder.CreateIndex(
                name: "IX_Stations_Code",
                table: "Stations",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_Stations_CreationDate",
                table: "Stations",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Stations_Id",
                table: "Stations",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stations_IsDepartment",
                table: "Stations",
                column: "IsDepartment");

            migrationBuilder.CreateIndex(
                name: "IX_Stations_UpdateDate",
                table: "Stations",
                column: "UpdateDate");

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_CreationDate",
                table: "Stocks",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_Id",
                table: "Stocks",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_UpdateDate",
                table: "Stocks",
                column: "UpdateDate");

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_UserId",
                table: "Stocks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_VariantId",
                table: "Stocks",
                column: "VariantId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_CreationDate",
                table: "Users",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Id",
                table: "Users",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Name",
                table: "Users",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Users_StationId",
                table: "Users",
                column: "StationId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UpdateDate",
                table: "Users",
                column: "UpdateDate");

            migrationBuilder.CreateIndex(
                name: "IX_Variants_CreationDate",
                table: "Variants",
                column: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_Variants_Designation_Name",
                table: "Variants",
                column: "Designation_Name");

            migrationBuilder.CreateIndex(
                name: "IX_Variants_FamilyId",
                table: "Variants",
                column: "FamilyId");

            migrationBuilder.CreateIndex(
                name: "IX_Variants_Id",
                table: "Variants",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Variants_UpdateDate",
                table: "Variants",
                column: "UpdateDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Captchas");

            migrationBuilder.DropTable(
                name: "Emails");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Packages");

            migrationBuilder.DropTable(
                name: "PhysicalMeasurements");

            migrationBuilder.DropTable(
                name: "Searches");

            migrationBuilder.DropTable(
                name: "Flows");

            migrationBuilder.DropTable(
                name: "Stocks");

            migrationBuilder.DropTable(
                name: "Stages");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Variants");

            migrationBuilder.DropTable(
                name: "Stations");

            migrationBuilder.DropTable(
                name: "Families");

            migrationBuilder.DropTable(
                name: "Climates");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
