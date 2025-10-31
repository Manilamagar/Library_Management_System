import React from 'react'
import './App.css'
import StudentDashboard from './Pages/StudentDashboard'
import Login from './Pages/Login'
import Home from './Pages/Home'

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/studentdashboard' element={<StudentDashboard/>}/>
        <Route path
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
