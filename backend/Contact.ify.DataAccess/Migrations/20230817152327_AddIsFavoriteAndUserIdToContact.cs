using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Contact.ify.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddIsFavoriteAndUserIdToContact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFavorite",
                table: "Contacts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Contacts",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFavorite",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Contacts");
        }
    }
}
