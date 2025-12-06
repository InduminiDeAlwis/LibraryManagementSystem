import React, { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { createBook, getBook, updateBook } from '../services/bookService';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './BookForm.css';

export default function BookForm() {
  const [book, setBook] = useState<Book>({ title: '', author: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getBook(Number(id))
        .then(res => setBook(res.data))
        .catch(err => {
          console.error('Error loading book:', err);
          alert('Failed to load book');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!book.title || book.title.trim() === '') {
      newErrors.title = 'Title is required';
    }
    
    if (!book.author || book.author.trim() === '') {
      newErrors.author = 'Author is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    try {
      if (id) {
        await updateBook(Number(id), book);
      } else {
        await createBook(book);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-form-container">
      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">
            {id ? '📝 Edit Book' : '➕ Add New Book'}
          </h2>
          <p className="form-subtitle">
            {id ? 'Update the book information' : 'Fill in the details to add a new book'}
          </p>
        </div>

        <form onSubmit={save} className="book-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              id="title"
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              value={book.title}
              onChange={e => {
                setBook({ ...book, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: '' });
              }}
              placeholder="Enter book title"
              disabled={loading}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author" className="form-label">
              Author <span className="required">*</span>
            </label>
            <input
              id="author"
              type="text"
              className={`form-input ${errors.author ? 'input-error' : ''}`}
              value={book.author}
              onChange={e => {
                setBook({ ...book, author: e.target.value });
                if (errors.author) setErrors({ ...errors, author: '' });
              }}
              placeholder="Enter author name"
              disabled={loading}
            />
            {errors.author && <span className="error-message">{errors.author}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-textarea"
              value={book.description}
              onChange={e => setBook({ ...book, description: e.target.value })}
              placeholder="Enter a brief description of the book"
              rows={5}
              disabled={loading}
            />
            <span className="helper-text">Optional - Provide a summary or notes about the book</span>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary btn-save"
              disabled={loading}
            >
              {loading ? '⏳ Saving...' : `💾 ${id ? 'Update' : 'Save'} Book`}
            </button>
            <Link 
              to="/" 
              className="btn btn-secondary btn-cancel"
            >
              ❌ Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}