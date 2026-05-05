import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './layout/Layout'
import PaginaLogin from './pages/PaginaLogin/PaginaLogin'
import PaginaCadastro from './pages/PaginaCadastro/PaginaCadastro'
import PaginaHistoricoReservas from './pages/PaginaHistoricoReservas/PaginaHistoricoReservas'
import PaginaReservas from './pages/PaginaReservas/PaginaReservas'
import Error from './pages/Error'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <PaginaLogin /> },
      { path: "/cadastro", element: <PaginaCadastro /> },
      { path: "/listaQuartos", element: <PaginaReservadeQuartos /> },
      { path: "/historicoReservas", element: <PaginaHistoricoReservas /> },
      { path: "/reservas", element: <PaginaReservas /> },
      { path: "*", element: <Error /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
