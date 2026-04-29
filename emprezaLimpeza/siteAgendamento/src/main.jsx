import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login/Login.jsx'
import Cadastro from './pages/Cadastro/Cadastro.jsx'
import Home from './pages/Home/Home.jsx'
import Agendamentos from './pages/Agendamentos/Agendamentos.jsx'
import HistoricoAgendamentos from './pages/HistoricoAgendamentos/HistoricoAgendamento.jsx'
import PaginaError from './pages/PaginaError.jsx'
import Layout from './layout/Layout.jsx'
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha.jsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/cadastro", element: <Cadastro /> },
      { path: "/home", element: <Home /> },
      { path: "/agendamentos", element: <Agendamentos /> },
      { path: "/historico", element: <HistoricoAgendamentos /> },
      {path: "/esqueciSenha", element: <RecuperarSenha/> },
      { path: "*", element: <PaginaError /> }
    ],
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router}/>
    {/* <AuthProvider>
    </AuthProvider> */}
  </StrictMode>,
)
