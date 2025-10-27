import React from 'react'
import './App.css'

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<StudentDashboard/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
