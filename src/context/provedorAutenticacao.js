import React from 'react'
import AutenticacaoService from '../app/service/autenticacaoService'
import jwt from 'jsonwebtoken'
import ApiService from '../app/apiservice'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer
const AuthProvider = AuthContext.Provider

class ProvedorAutenticacao extends React.Component {
    state = {
        usuarioAutenticado : null,
        isAutenticado : false
    }

    iniciarSessao = (tokenDTO) => {
        const token = tokenDTO.token
        const claims = jwt.decode(token)
        const usuario = {
            id: claims.userId,
            nome: claims.nome
        }

        AutenticacaoService.logar(usuario,token)
        this.setState({isAutenticado : true, usuarioAutenticado : usuario})
    }

    encerrarSessao = () =>{
        AutenticacaoService.removerUsuarioAutenticado()
        this.setState({isAutenticado : false, usuarioAutenticado : null})
    }

    componentDidMount(){
        const isAutenticado = AutenticacaoService.isUsuarioAutenticado()
        if(isAutenticado){
            const usuario = AutenticacaoService.atualizarSessao()
            this.setState({
                isAutenticado: true,
                usuarioAutenticado: usuario
            })
        }
    }

    render(){
        const contexto = {
            usuarioAutenticado : this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return(
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao