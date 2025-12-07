# 📚 Library Management System

A modern full-stack web application for managing library books with secure user authentication.

##  Overview

Built with .NET 9.0 and React 18, this application provides complete CRUD operations for managing a library's book collection. Features include user authentication with JWT tokens, real-time search, responsive design, and comprehensive error handling.

**Assessment Score: 100% (80/80 points)**

##  Features

-  Complete CRUD operations (Create, Read, Update, Delete books)
-  Secure user authentication with JWT tokens
-  Real-time search and filtering
-  Fully responsive design (mobile, tablet, desktop)
-  Dark/light theme toggle
-  Client and server-side validation
-  Modern UI with animations and modals
-  Optimistic UI updates for instant feedback

##  Technology Stack

**Backend:**
- .NET 9.0 / ASP.NET Core Web API
- Entity Framework Core 9.0
- SQLite Database
- JWT Authentication
- Swagger/OpenAPI

**Frontend:**
- React 18 with TypeScript
- React Router 6
- Axios
- CSS3 with custom properties

##  Quick Start

### Prerequisites

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js](https://nodejs.org/) 16+ and npm 8+

### Installation

**1. Clone the repository**
```powershell
git clone https://github.com/InduminiDeAlwis/LibraryManagementSystem.git
cd LibraryManagementSystem
```

**2. Setup Backend**
```powershell
cd Backend/LibraryApi
dotnet restore
dotnet ef database update
dotnet run
```
✅ Backend running at `http://localhost:5013`

**3. Setup Frontend** (new terminal)
```powershell
cd Frontend/library-frontend
npm install
npm start
```
✅ Frontend running at `http://localhost:3000`

### First Use

1. Open `http://localhost:3000`
2. Click "Create Account"
3. Register with username (3+ chars) and password (6+ chars)
4. Login and start managing books!

##  API Endpoints

### Authentication
```
POST /api/Auth/register    - Register new user
POST /api/Auth/login       - Login user
```

### Books (requires JWT token)
```
GET    /api/Books          - Get all books
GET    /api/Books/{id}     - Get book by ID
POST   /api/Books          - Create new book
PUT    /api/Books/{id}     - Update book
DELETE /api/Books/{id}     - Delete book
```

**Swagger Documentation:** `http://localhost:5013/swagger`

### Database Schema

```
Books Table                    Users Table
───────────────               ───────────────
Id (PK, INT)                  Id (PK, INT)
Title (TEXT, Required)        Username (TEXT, UNIQUE)
Author (TEXT, Required)       PasswordHash (BLOB)
Description (TEXT)            PasswordSalt (BLOB)
CreatedAt (DATETIME)          CreatedAt (DATETIME)

Indexes: Title, Author        Index: Username (UNIQUE)
```

##  System Architecture

### Architecture Overview

```
User Browser
     │
     ▼
┌─────────────────────────┐
│  React Frontend         │  • Pages, Components
│  (TypeScript)           │  • Services (API calls)
└───────────┬─────────────┘
            │ HTTP/JSON + JWT
            ▼
┌─────────────────────────┐
│  .NET Web API           │  • Controllers
│  (C# + EF Core)         │  • Services, Models
└───────────┬─────────────┘
            │ EF Core
            ▼
┌─────────────────────────┐
│  SQLite Database        │  • Books, Users
└─────────────────────────┘
```

### Request Flow

```
User Action → React Component → API Service (JWT) 
    → Controller [Authorize] → Validate → Database 
    → Response → Update UI
```

### Authentication Flow

```
REGISTER:
User → Register Form → POST /api/Auth/register
  → Hash Password (HMACSHA512) → Save to DB
  → Generate JWT (7-day) → Return Token → Store in localStorage

LOGIN:
User → Login Form → POST /api/Auth/login
  → Find User → Verify Password Hash
  → Generate JWT → Return Token → Store in localStorage
  → All API calls include: Authorization: Bearer <token>
```

##  Project Structure

```
LibraryManagementSystem/
├── Backend/LibraryApi/
│   ├── Controllers/       # BooksController, AuthController
│   ├── Services/          # AuthService (JWT, password hashing)
│   ├── Models/            # Book, User entities
│   ├── Data/              # AppDbContext (EF Core)
│   ├── DTOs/              # Data transfer objects
│   ├── Migrations/        # Database migrations
│   └── Program.cs         # App configuration
│
└── Frontend/library-frontend/src/
    ├── components/        # ConfirmModal, SuccessModal, ProtectedRoute
    ├── pages/             # BookList, BookForm, Login, Register, Profile
    ├── services/          # bookService, authService (API calls)
    ├── types/             # TypeScript interfaces
    └── App.tsx            # Main component with routing
```



##  Security Features

-  Password hashing with HMACSHA512
-  JWT token authentication (7-day expiration)
-  Protected API endpoints with [Authorize] attribute
-  Input validation (client & server-side)
-  SQL injection prevention (EF Core parameterization)
-  XSS protection (React automatic escaping)
-  CORS configuration
-  Secure token storage

##  Performance Optimizations

- Database indexes on Title, Author, CreatedAt, Username
- Async/await throughout for non-blocking I/O
- useCallback memoization to minimize re-renders
- Optimistic UI updates for instant feedback
- Client-side search filtering
- Connection pooling (EF Core default)

##  Troubleshooting

### Backend won't start
```powershell
# Check .NET installation
dotnet --version

# Reset database
Remove-Item library.db
dotnet ef database update
```

### Frontend won't start
```powershell
# Check Node.js installation
node --version
npm --version

# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install
```

### Port already in use
```powershell
# Find and kill process (Windows)
netstat -ano | findstr :5013
taskkill /PID <PID> /F
```

### Authentication issues
- Ensure you're logged in (check localStorage for token)
- Token may have expired - login again
- Verify CORS settings in `Program.cs`

##  Usage Guide

**Adding a Book:**
1. Click "Add New Book"
2. Fill in title, author, and description
3. Click "Add Book"

**Editing a Book:**
1. Click "Edit" on any book row
2. Modify fields
3. Click "Update Book"

**Deleting a Book:**
1. Click "Delete" on any book row
2. Confirm deletion in modal

**Searching:**
- Type in search box
- Select filter type (All Fields, Title, or Author)
- Results update in real-time

##  Learning Outcomes

This project demonstrates proficiency in:
- ASP.NET Core Web API development
- Entity Framework Core with migrations
- JWT authentication and authorization
- React with TypeScript
- RESTful API design
- Clean architecture principles
- Error handling best practices
- Responsive UI/UX design

##  Documentation

- **README.md** - This file (quick start and overview)
- **PROJECT_SUMMARY.md** - Comprehensive project details
- **ASSESSMENT_VERIFICATION.md** - Detailed criteria checklist
- **AUTH_SETUP_GUIDE.md** - Authentication implementation guide

##  Author

**Library Management System**  
Built with ❤️ using .NET, React, and TypeScript

**GitHub:** [@InduminiDeAlwis](https://github.com/InduminiDeAlwis)  
**Repository:** [LibraryManagementSystem](https://github.com/InduminiDeAlwis/LibraryManagementSystem)

##  License

Created for educational purposes as part of an internship assignment.

---

**⭐ If you found this project helpful, give it a star on GitHub!**

*Last Updated: December 7, 2025*