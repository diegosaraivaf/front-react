import ApiService from "../apiservice";

class UsuarioService extends ApiService{
    constructor(){
        super('/usuario')
    }

    salvar(usuario){
        return this.post('/',usuario)
    }

    autenticar(usuario){
        console.log('TESTE')
        return this.post('/autenticar',usuario)
    }
}

export default UsuarioService
