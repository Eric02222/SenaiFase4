import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import CadastroUsuario from './pages/CadastroUsuario/CadastroUsuario'
import Error from './pages/Error'

const router = createBrowserRouter([
  {
    children: [
      { path: "/", element: <CadastroUsuario /> },
      { path: "*", element: <Error /> },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
