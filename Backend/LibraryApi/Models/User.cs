using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Models
{
    /// <summary>
    /// Represents a user account in the library management system.
    /// Implements secure password storage and user authentication.
    /// </summary>
    public class User
    {
        /// <summary>
        /// Gets or sets the unique identifier for the user.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the username for authentication.
        /// Must be unique and between 3-50 characters.
        /// </summary>
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the hashed password using HMACSHA512.
        /// Never stores passwords in plain text.
        /// </summary>
        [Required]
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();

        /// <summary>
        /// Gets or sets the password salt used for hashing.
        /// Unique salt for each user enhances security.
        /// </summary>
        [Required]
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();

        /// <summary>
        /// Gets or sets the date when the user account was created.
        /// Automatically set to UTC time on registration.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
