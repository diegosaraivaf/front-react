import ApiService from "../apiservice";

class UsuarioService extends ApiService{
    constructor(){
        super('/usuarios')
    }

    salvar(usuario){
        return this.post('/',usuario)
    }

    pesquisar(){
        return this.get('/')
    }

    autenticar(usuario){
        return this.post('/autenticar/',usuario)
    }
}

export default UsuarioService
