import React from 'react'
import './App.css'
import StudentDashboard from './Pages/StudentDashboard'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { Route } from 'react-router-dom'

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
        <Route path='/Books' element={</>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
