import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import { Signin } from './pages/Signin'

function App() {
  

  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<signup />} />

        <Route path='/signup' element={<signup />} />

        <Route path='/signup' element={<signup />} />

       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
