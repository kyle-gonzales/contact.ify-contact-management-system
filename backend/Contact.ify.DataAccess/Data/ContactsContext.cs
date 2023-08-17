using Contact.ify.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace Contact.ify.DataAccess.Data;

public class ContactsContext : DbContext
{
    public ContactsContext(DbContextOptions<ContactsContext> options) : base(options) {}

    public DbSet<User> Users { get; set; }
}