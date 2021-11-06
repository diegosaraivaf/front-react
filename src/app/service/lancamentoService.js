import ApiService from "../apiservice"

export default class LancamentoService extends ApiService {

    constructor(){
        super('/lancamentos')
    }

    consultar(lancamentoFiltro){
        let params = `?a=a`

        if(lancamentoFiltro.id){
            params = `${params}&id=${lancamentoFiltro.id}`
        }

        if(lancamentoFiltro.tipo){
            params = `${params}&tipoLancamento=${lancamentoFiltro.tipo}`
        }
        if(lancamentoFiltro.contribuinteNome){
            params = `${params}&contribuinteNome=${lancamentoFiltro.contribuinteNome}`
        }
        if(lancamentoFiltro.contribuinteDocumento){
            params = `${params}&contribuinteDocumento=${lancamentoFiltro.contribuinteDocumento}`
        }

        return this.get(params)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    salvar(lancamento){
        return this.post('/',lancamento)
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`,lancamento)
    }
    
    obterPorId(id){
        return this.get(`/${id}`)
    }

    tiposLancamentos(){
        const tipos = [
            {label:'Selecione um valor', value:''},
            {label:'IPTU', value:'IPTU'},
            {label:'ITBI', value:'ITBI'},
            {label:'TAXA', value:'TAXA'},
            {label:'ISS', value:'ISS'},
        ]

        return tipos
    }
    

}