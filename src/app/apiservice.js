import axios from 'axios'

const httpClient = axios.create({
    baseURL : 'http://localhost:8080',
    withCredentials:true
})

class ApiService {

    constructor(apiurl){
        this.apiurl = apiurl
    }

    static adicionarTokenCabecalho(token){
        if(token){
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`

            console.log('registrou o token : ',httpClient.defaults.headers.common['Authorization'])
        }
    }

    post(url,object){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl,object)
    }

    put(url,object){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl,object)
    }

    get(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl)
    }

    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl)
    }

}

export default ApiService