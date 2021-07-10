import ApiService from "../apiservice";

class UsuarioService extends ApiService{
    constructor(){
        super('/usuario')
    }

    salvar(usuario){
        return this.post('/',usuario)
    }

    autenticar(usuario){
        this.post('/',usuario)
    }
}

export default UsuarioService
