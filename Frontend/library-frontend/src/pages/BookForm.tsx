import React, { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { createBook, getBook, updateBook } from '../services/bookService';
import { useNavigate, useParams } from 'react-router-dom';

export default function BookForm() {
  const [book, setBook] = useState<Book>({ title: '', author: '', description: '' });
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      getBook(Number(id)).then(res => setBook(res.data));
    }
  }, [id]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book.title) { alert('Title required'); return; }
    if (id) {
      await updateBook(Number(id), book);
    } else {
      await createBook(book);
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Book</h2>
      <form onSubmit={save}>
        <div>
          <label>Title</label><br />
          <input value={book.title} onChange={e => setBook({ ...book, title: e.target.value })} />
        </div>
        <div>
          <label>Author</label><br />
          <input value={book.author} onChange={e => setBook({ ...book, author: e.target.value })} />
        </div>
        <div>
          <label>Description</label><br />
          <textarea value={book.description} onChange={e => setBook({ ...book, description: e.target.value })} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}