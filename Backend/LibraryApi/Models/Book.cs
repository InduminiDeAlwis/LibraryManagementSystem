using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Models
{
    /// <summary>
    /// Represents a book in the library management system.
    /// Implements validation rules for data integrity.
    /// </summary>
    public class Book
    {
        /// <summary>
        /// Gets or sets the unique identifier for the book.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the title of the book.
        /// Required field with length constraints (1-200 characters).
        /// </summary>
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(200, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 200 characters.")]
        public string Title { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the author of the book.
        /// Required field with length constraints (1-100 characters).
        /// </summary>
        [Required(ErrorMessage = "Author is required.")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Author must be between 1 and 100 characters.")]
        public string Author { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the description of the book.
        /// Optional field with maximum length of 1000 characters.
        /// </summary>
        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the date when the book was added to the library.
        /// Automatically set to UTC time on creation.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}