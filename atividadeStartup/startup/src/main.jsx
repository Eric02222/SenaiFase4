import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import HeaderLayout from "./layout/HeaderLayout";
import Home from "./pages/Home/Home";
import PaginaLogs from "./pages/HistoricoAlteracoesVeculos/HistoricoAlteracoesVeiculos";
import { AuthProvider } from "./context/Context";

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "cadastro", element: <Cadastro /> },
      { path: "/home", element: <Home /> },
      { path: "/historico", element: <PaginaLogs /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
