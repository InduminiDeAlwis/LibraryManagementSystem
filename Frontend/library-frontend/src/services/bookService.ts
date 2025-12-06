import axios from 'axios';
import { Book } from '../types/Book';

const API_BASE = "http://localhost:5013/api";

export const getBooks = () => axios.get<Book[]>(`${API_BASE}/Books`);
export const getBook = (id: number) => axios.get<Book>(`${API_BASE}/Books/${id}`);
export const createBook = (book: Book) => axios.post<Book>(`${API_BASE}/Books`, book);
export const updateBook = (id: number, book: Book) => axios.put(`${API_BASE}/Books/${id}`, book);
export const deleteBook = (id: number) => axios.delete(`${API_BASE}/Books/${id}`);
