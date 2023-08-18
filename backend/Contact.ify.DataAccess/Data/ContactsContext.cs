using Contact.ify.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace Contact.ify.DataAccess.Data;

public class ContactsContext : DbContext
{
    public ContactsContext(DbContextOptions<ContactsContext> options) : base(options) {}

    public DbSet<User> Users { get; set; }

    public DbSet<Entities.Contact> Contacts { get; set; }
    public DbSet<ContactEmail> Emails { get; set; }
    public DbSet<ContactAddress> Addresses { get; set; }
    public DbSet<ContactPhoneNumber> PhoneNumbers { get; set; }
    
    public DbSet<ContactAudit> ContactAuditTrail { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContactAddress>()
            .Property(address => address.AddressType)
            .HasConversion<string>();

        modelBuilder.Entity<ContactAudit>()
            .Property(audit => audit.ModificationType)
            .HasConversion<string>();
        
        base.OnModelCreating(modelBuilder);
    }
}