using Microsoft.EntityFrameworkCore;
using LibraryApi.Models;

namespace LibraryApi.Data
{
    /// <summary>
    /// Database context for the Library Management System.
    /// Configures entity relationships and database schema.
    /// </summary>
    public class AppDbContext : DbContext
    {
        /// <summary>
        /// Initializes a new instance of the AppDbContext.
        /// </summary>
        /// <param name="options">The database context options.</param>
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        /// <summary>
        /// Gets or sets the Books DbSet for CRUD operations.
        /// </summary>
        public DbSet<Book> Books { get; set; } = null!;

        /// <summary>
        /// Gets or sets the Users DbSet for authentication.
        /// </summary>
        public DbSet<User> Users { get; set; } = null!;

        /// <summary>
        /// Configures the model and relationships using Fluent API.
        /// Implements database constraints and indexes for performance.
        /// </summary>
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