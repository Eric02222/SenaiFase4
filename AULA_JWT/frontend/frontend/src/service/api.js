import axios from "axios"

const clienthttp = axios.create({
    baseURL: "http://127.0.0.1:8081",
    withCredentials: true
})

clienthttp.interceptors.response.use(
    (response) => response,

    async (erro) => {
        //Guarda a configuração da requisição que falhou( URL, headers, body, etc...)
        const requisiçãoOriginal = erro.config;

        //401 não autorizado ou token expirado
        //requisiçãoOriginal._retry significa para evitar loop infinito
        if(erro.response.status === 401 && !requisiçãoOriginal){
            requisiçãoOriginal._retry = true;

            try {
                const {data} = await axios.post(
                    "http://localhost/auth/refresh",{}, {withCredentials: true}
                );

                //salva o novo token de acesso
                localStorage.setItem("accessToken", data.accessToken);

                //atualiza o cabeçalho original
                requisiçãoOriginal.headers.Authorization = `Bearer ${data.accessToken}`
            } catch (error) {
                localStorage.removeItem("accessToken")
                window.location.href = "/"
            }
        }

    }
)


export default clienthttp;