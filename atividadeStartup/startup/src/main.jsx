import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import HeaderLayout from './layout/HeaderLayout';
import Home from './pages/Home/Home';
import PaginaLogs from './pages/paginaLogs/PaginaLogs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    element: (
      <HeaderLayout />
    ),
    children: [
      { path: "/", element: <Login /> },
      { path: 'cadastro', element: <Cadastro /> },
      { path: "/home", element: <Home/>},
      { path: "/historico", element: <PaginaLogs /> },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
