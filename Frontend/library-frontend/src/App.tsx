import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated, logout, getUsername } from './services/authService';
import './App.css';

function Navigation() {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  const username = getUsername();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">Library Management System</h1>
        <nav className="app-nav">
          {isLoggedIn ? (
            <>
              <span className="nav-username"><span className="icon">●</span> {username}</span>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/add" className="nav-link nav-link-primary">+ Add Book</Link>
              <button onClick={handleLogout} className="nav-link nav-link-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Sign In</Link>
              <Link to="/register" className="nav-link nav-link-primary">Create Account</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <BookList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add" 
              element={
                <ProtectedRoute>
                  <BookForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit/:id" 
              element={
                <ProtectedRoute>
                  <BookForm />
                </ProtectedRoute>
              } 
            />
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