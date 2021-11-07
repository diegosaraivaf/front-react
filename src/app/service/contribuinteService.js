import ApiService from "../apiservice";

export default class ContribuinteService extends ApiService {
    constructor(){
        super('/contribuintes')
    }

    salvar(contribuinte){
        return this.post('/',contribuinte)
    }

    pesquisar(){
        return this.get('/')
    }

    buscarPorDocumento(documento){
        return this.get(`/documento/${documento}`)
    }

    deletar(contribuinte){
        return this.delete(`/${contribuinte.id}`)
    }

    obterPorId(idContribuinte){
        return this.get(`/${idContribuinte}`)
    }
}