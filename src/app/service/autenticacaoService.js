import LocalStorageService from "./localStorageService";

export const USUARIO_LOGADO = '_usuario_logado'

export default class AutenticacaoService {

    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        return usuario !== null && usuario.id !== null
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO)
    }
}