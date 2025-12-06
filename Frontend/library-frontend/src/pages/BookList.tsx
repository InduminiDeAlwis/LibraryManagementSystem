import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/bookService';
import { Book } from '../types/Book';
import { Link } from 'react-router-dom';

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  const load = async () => {
    const res = await getBooks();
    setBooks(res.data || []);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id?: number) => {
    if (!id) return;
    if (!window.confirm('Delete this book?')) return;
    await deleteBook(id);
    load();
  };

  return (
    <div>
      <h2>Books</h2>
      {books.length === 0 ? <p>No books.</p> : (
        <table>
          <thead>
            <tr><th>Title</th><th>Author</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {books.map(b => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>
                  <Link to={`/edit/${b.id}`}>Edit</Link> | <button onClick={() => remove(b.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}