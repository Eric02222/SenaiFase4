import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout.jsx'
import Home from './components/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha.jsx'
import Produto from './components/Produto/Produto.jsx'
import Cadastro from './pages/Cadastro/Cadastro.jsx'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/usuario/cadastro' element={<Cadastro />}></Route>
            <Route path='/produto/cadastro' element={<CadastroProduto />}></Route>
            <Route path='/produto' element={<Produto />}></Route>
            <Route path='/usuario' element={<ListarUsuario />}></Route>

          </Route>

          <Route path='/login' element={<Login />}></Route>
          <Route path='/esqueciSenha' element={<RecuperarSenha />}></Route>


          <Route path='*' element={<Error />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
