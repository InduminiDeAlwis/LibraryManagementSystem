import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">📚 Library Management System</h1>
            <nav className="app-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/add" className="nav-link nav-link-primary">+ Add Book</Link>
            </nav>
          </div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<BookForm />} />
            <Route path="/edit/:id" element={<BookForm />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2025 Library Management System. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;