using Microsoft.EntityFrameworkCore;
using LibraryApi.Models;

namespace LibraryApi.Data
{
    /// Database context for the Library Management System.
    /// Configures entity relationships and database schema.
    public class AppDbContext : DbContext
    {
        /// Initializes a new instance of the AppDbContext.
        /// <param name="options">The database context options.</param>
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        /// Gets or sets the Books DbSet for CRUD operations.
        public DbSet<Book> Books { get; set; } = null!;

        /// Gets or sets the Users DbSet for authentication.
        public DbSet<User> Users { get; set; } = null!;

        /// Configures the model and relationships using Fluent API.
        /// Implements database constraints and indexes for performance.
        /// <param name="modelBuilder">The model builder.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Book entity with constraints and indexes
            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasKey(b => b.Id);
                entity.Property(b => b.Title).IsRequired().HasMaxLength(200);
                entity.Property(b => b.Author).IsRequired().HasMaxLength(100);
                entity.Property(b => b.Description).HasMaxLength(1000);
                entity.Property(b => b.CreatedAt).IsRequired();

                // Add indexes for frequently queried columns to improve performance
                entity.HasIndex(b => b.Title);
                entity.HasIndex(b => b.Author);
                entity.HasIndex(b => b.CreatedAt);
            });

            // Configure User entity with constraints
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Username).IsRequired().HasMaxLength(50);
                entity.Property(u => u.PasswordHash).IsRequired();
                entity.Property(u => u.PasswordSalt).IsRequired();
                entity.Property(u => u.CreatedAt).IsRequired();

                // Add unique index on Username for fast lookups and uniqueness
                entity.HasIndex(u => u.Username).IsUnique();
            });
        }
    }
}