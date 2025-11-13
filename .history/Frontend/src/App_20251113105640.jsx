import React from 'react'
import './App.css'
import StudentDashboard from './Pages/StudentDashboard'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Register from './Pages/Register'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import BookCard from './Shared/BookCard'
import UserModal from './Shared/UserModal.jsx'
import Books from './Pages/Books.jsx'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/studentdashboard' element={<StudentDashboard/>}/>
        <Route path='/BookCard' element={<BookCard/>}/>
        <Route path='/UserModel' element={<UserModal/>}/>
        <Route path='Books' element={<Books/>}/>

        <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* User Routes */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Librarian Routes */}
          <Route
            path="/librarian/dashboard"
            element={
              <ProtectedRoute allowedRoles={['librarian', 'admin']}>
                <LibrarianDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute allowedRoles={['admin', 'librarian']}>
                <BookList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/add"
            element={
              <ProtectedRoute allowedRoles={['admin', 'librarian']}>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/edit/:idelement={<ProtectedRoute allowedRoles={['admin', 'librarian']}><EditBook /></ProtectedRoute>}/>

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard />
              </ProtectedRoute>}/>
<Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
