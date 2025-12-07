using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Models
{
    /// Represents a user account in the library management system.
    /// Implements secure password storage and user authentication.
    public class User
    {
        /// Gets or sets the unique identifier for the user.
        public int Id { get; set; }

        /// Gets or sets the username for authentication.
        /// Must be unique and between 3-50 characters.
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; } = string.Empty;

        /// Gets or sets the hashed password using HMACSHA512.
        /// Never stores passwords in plain text.
        [Required]
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();

        /// Gets or sets the password salt used for hashing.
        /// Unique salt for each user enhances security.
        [Required]
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();

        /// Gets or sets the date when the user account was created.
        /// Automatically set to UTC time on registration.
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
