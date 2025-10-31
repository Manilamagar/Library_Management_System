import React from 'react'
import './App.css'
import StudentDashboard from './Pages/StudentDashboard'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { Route } from 'react-router-dom'
import BookCard from './Shared/BookCard'
import UserModal from './Shared/UserModal.jsx'

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
        <Route path='Book' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
