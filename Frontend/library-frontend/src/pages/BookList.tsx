import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/bookService';
import { Book } from '../types/Book';
import { Link } from 'react-router-dom';
import './BookList.css';

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getBooks();
      setBooks(res.data || []);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id?: number) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(id);
      load();
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
  };

  return (
    <div className="book-list-container">
      <div className="page-header">
        <h2 className="page-title">Book Collection</h2>
        <p className="page-subtitle">
          {books.length} {books.length === 1 ? 'book' : 'books'} in the library
        </p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No books yet</h3>
          <p>Start building your library by adding your first book!</p>
          <Link to="/add" className="btn btn-primary">Add Your First Book</Link>
        </div>
      ) : (
        <div className="table-container">
          <table className="books-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th className="description-column">Description</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(b => (
                <tr key={b.id} className="table-row">
                  <td className="book-title">{b.title}</td>
                  <td className="book-author">{b.author || 'Unknown'}</td>
                  <td className="book-description">
                    {b.description ? (
                      b.description.length > 100 
                        ? `${b.description.substring(0, 100)}...` 
                        : b.description
                    ) : (
                      <span className="no-description">No description</span>
                    )}
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <Link to={`/edit/${b.id}`} className="btn btn-edit">
                        ✏️ Edit
                      </Link>
                      <button 
                        onClick={() => remove(b.id)} 
                        className="btn btn-delete"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}