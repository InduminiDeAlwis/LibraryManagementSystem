import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <h1>Library Management</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/add">Add Book</Link>
        </nav>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;