import React from 'react'
import './App.css'
import StudentDashboard from './Pages/StudentDashboard'

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/studentdashboard' element={<StudentDashboard/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
