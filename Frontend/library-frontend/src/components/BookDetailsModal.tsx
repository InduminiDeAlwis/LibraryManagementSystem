import React from 'react';
import { Book } from '../types/Book';
import './BookDetailsModal.css';

interface BookDetailsModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDetailsModal({ 
  book, 
  isOpen, 
  onClose
}: BookDetailsModalProps) {
  if (!isOpen || !book) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="book-details-modal-overlay" onClick={handleBackdropClick}>
      <div className="book-details-modal">
        <div className="modal-header">
          <h2 className="modal-title">📖 Book Details</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="book-detail-section">
            <label className="detail-label">Title</label>
            <p className="detail-value book-detail-title">{book.title}</p>
          </div>

          <div className="book-detail-section">
            <label className="detail-label">Author</label>
            <p className="detail-value">{book.author || 'Unknown'}</p>
          </div>

          <div className="book-detail-section">
            <label className="detail-label">Description</label>
            <p className="detail-value book-detail-description">
              {book.description || 'No description available'}
            </p>
          </div>

          {book.createdAt && (
            <div className="book-detail-section">
              <label className="detail-label">Added on</label>
              <p className="detail-value detail-date">{formatDate(book.createdAt)}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-close-modal" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
