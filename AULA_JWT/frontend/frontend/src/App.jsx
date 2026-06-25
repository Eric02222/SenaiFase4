import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import Perfil from './pages/Perfil'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rotas publicas: qualquer um pode acessar*/}
          <Route path='/login' element={<Login />} />
          <Route path='/registrar' element={<Registrar />} />

          {/* Rotas Privadas/protegidas: apenas quem esta autenticado pode acessar*/}
          <Route path='/perfil' element={<Perfil />} />

          {/* Qualquer outra URL fora do nosso sistema rediciona para a tela de login*/}
          <Route path='*' element={<Login />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
