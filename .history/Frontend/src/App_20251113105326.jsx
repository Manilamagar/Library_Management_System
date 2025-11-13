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
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
