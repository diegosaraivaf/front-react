import ApiService from "../apiservice";

export default class ContribuinteService extends ApiService {
    constructor(){
        super('/contribuintes')
    }

    salvar(contribuinte){
        return this.post('/',contribuinte)
    }

    pesquisar(contribuinte){
        let params =  `?a=a`
        
        if(contribuinte.nome){
            params = `${params}&nome=${contribuinte.nome}`
        }
        if(contribuinte.documento){
            params = `${params}&documento=${contribuinte.documento}`
        }
        if(contribuinte.endereco){
            params = `${params}&endereco=${contribuinte.endereco}`
        }

        return this.get(params)
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