import { useState } from "react"
import { esqueciSenha } from "../../services/login";
import { useNavigate } from "react-router"

function RecuperarSenha() {
    const [form, setForm] = useState({
        email: '',
        novaSenha: '',
        confirmarSenha: ''
    })
    const navigate = useNavigate()

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const ok = await esqueciSenha(form);
            console.log(ok)
            if (ok.success) {
                alert('Senha alterada com sucesso')
                navigate('/')
            }
        } catch (error) {
            console.log("Erro ao recuperar senha", error)
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handleChangePassword} >
                <h2>Recuperar Senha</h2>
                <div className="form-group mb-3">
                    <label htmlFor="senhaRegistro">Email</label>
                    <input type="email" id='email' className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder='Digite seu Email' required />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="senhaRegistro">Nova Senha</label>
                    <input type="password" id='senha_nova' className="form-control" value={form.novaSenha} onChange={(e) => setForm({ ...form, novaSenha: e.target.value })} placeholder='Nova Senha' required />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="senhaRegistro">Confirmar Senha</label>
                    <input type="password" id='confirmar_senha' className="form-control" value={form.confirmarSenha} onChange={(e) => setForm({ ...form, confirmarSenha: e.target.value })} placeholder='Confirmar Senha' required />
                </div>


                <button type="submit" className="btn btn-primary">
                    Recuperar Senha
                </button>
            </form>
        </div>
    )
}

export default RecuperarSenha