import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HeaderLayout from "./layout/HeaderLayout";
import { AuthProvider } from "./context/Context";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import 'bootstrap/dist/css/bootstrap.min.css';
import Produto from './components/Produto/Produto';
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha';
import ListaUsuarios from './pages/ListaUsuarios/ListaUsuarios';
import Error from './pages/Error';
import Home from './pages/Home/Home';


const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "cadastro", element: <Cadastro /> },
      { path: "home", element: <Home /> },
      { path: "produtos", element: <Produto /> },
      { path: "esquciSenha", element: <RecuperarSenha /> },
      { path: "usuario", element: <ListaUsuarios /> },
      { path: "*", element: <Error /> },

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
