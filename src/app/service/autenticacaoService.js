import LocalStorageService from "./localStorageService"
import jwt from "jsonwebtoken"
import ApiService from "../apiservice"

export const USUARIO_LOGADO = '_usuario_logado'
export const TOKEN_ACESSO = '_token_acesso'

export default class AutenticacaoService {

    static isUsuarioAutenticado(){
        const token = LocalStorageService.obterItem(TOKEN_ACESSO)

        if(token){
            console.log('token ',token)
            const decodedToken = jwt.decode(token)
            console.log('decoded token ',decodedToken)
            const expiracao = decodedToken.exp
            const isTokenInvalido = Date.now() >= (expiracao * 1000)

            return !isTokenInvalido
        }
        else{
            return false
        }
/*         const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        return usuario !== null && usuario.id !== null */
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO)
        LocalStorageService.removerItem(TOKEN_ACESSO)
    }

    static logar(usuario, token){
        LocalStorageService.adicionarItem(USUARIO_LOGADO,usuario)
        LocalStorageService.adicionarItem(TOKEN_ACESSO,token)
        /* registrarToken */
        ApiService.adicionarTokenCabecalho(token)
    }

    static obterUsuarioAutenticado(){
        return LocalStorageService.obterItem(USUARIO_LOGADO)
    }

    static atualizarSessao(){
        const token = LocalStorageService.obterItem(TOKEN_ACESSO)
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        
        AutenticacaoService.logar(usuario,token)
        return usuario
    }
}