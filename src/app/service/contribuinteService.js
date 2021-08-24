import ApiService from "../apiservice";

export default class ContribuinteService extends ApiService {
    constructor(){
        super('/contribuintes')
    }

    salvar(contribuinte){
        return this.post('/',contribuinte)
    }
}