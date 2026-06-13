import './App.css'
import Login from './components/Login'
import Agendamentos from './components/Agendamentos'
import Usuarios from './components/Usuarios'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path="/usuarios" element={<Usuarios />} />
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
