using Microsoft.EntityFrameworkCore;

namespace HFilesBackend.Models;

public class UserContext: DbContext
{
    public UserContext(DbContextOptions<UserContext> options): base(options)
    {
        
    }

    public DbSet<User> Users {get; set;}
    public DbSet<Document> Documents { get; set; }
}