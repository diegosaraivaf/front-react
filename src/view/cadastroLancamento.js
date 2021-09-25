import React from 'react'
import LancamentoService from '../app/service/lancamentoService'
import ContribuinteService from '../app/service/contribuinteService'
import Card from '../components/card'
import { withRouter } from 'react-router-dom'
import { mensagemErro,mensagemSucesso } from '../components/toastr'
import SelectMenu from '../components/selectMenu'

class CadastroLancamento extends React.Component{
    constructor(){
        super()
        this.lancamentoService = new LancamentoService()
        this.contribuinteService = new ContribuinteService();
    }

    state = {
        id : '',
        tipoLancamento : '',
        valor : '',
        contribuinte : {
            id: '',
            nome: '',
            documento: '',
            endereco: ''
        },
        atualizando : false
    }

    componentDidMount(){
        const parametros = this.props.match.params
        
        if(parametros.id){
            this.lancamentoService.obterPorId(parametros.id).then(response =>{
                console.log('response ',response)
                /* spread opetator - seta altomaticamente os atributos com o mesmo nome*/
                this.setState({...response.data,atualizando : true})
            }).catch(error =>{
                if(error.response.data){
                    mensagemErro(error.response.data)
                }
            })
        }
        

    }

    handleChange = (event) =>{
        const value = event.target.value
        const name = event.target.name

        this.setState({[name] : value})
    }

    salvar = () =>{
        const  {tipoLancamento,valor,contribuinte} = this.state
        const lancamento = {
            tipoLancamento,
            valor,
            contribuinte
        }
        this.lancamentoService.salvar(lancamento).then(response =>{
            mensagemSucesso('Lancamento salvo com sucesso')
            this.props.history.push('/consulta-lancamento')
        }).catch(error =>{
            mensagemErro(error.response.data)
        })
    }

    atualizar = () =>{
        console.log(this.state)
        const  {id,tipoLancamento,valor,contribuinte} = this.state
        const lancamento = {
            id,
            tipoLancamento,
            valor,
            contribuinte
        }
        this.lancamentoService.atualizar(lancamento).then(response =>{
            mensagemSucesso('Lancamento atualizado com sucesso')
            this.props.history.push('/consulta-lancamento')
        }).catch(error =>{
            mensagemErro(error.response.data)
        })
    }

    aoAlterarDocumento = (event) => {
        /* this.setState({contribuinte: {documento : event.target.value}}) */
    
        this.setState(prevState => ({contribuinte :{...prevState.contribuinte, documento: event.target.value}}));  
       

        this.contribuinteService.buscarPorDocumento(event.target.value).then(response =>{
            if(response.data){
                this.setState({
                    contribuinte : response.data
                })   
                console.log(this.state)
            }else{
                this.setState({
                    contribuinte : {
                        id:'',
                        nome:'',
                        documento:event.target.value,
                        endereco:''
                    }
                })   
            }
        }).catch({

        })
    } 

    render(){
        const tiposLancamentos = this.lancamentoService.tiposLancamentos()

        return(
            <div>
                <div className="container">
                    <Card title={this.state.atualizando ? 'Atualização de Lancamento' : 'Cadastro de Lancamento'}>

                        Tipo
                        <SelectMenu name="tipoLancamento" value={this.state.tipoLancamento} 
                        lista={tiposLancamentos} 
                        onChange={this.handleChange} 
                        className="form-control"/>

                        Valor
                        <input value={this.state.valor} name="valor" onChange={this.handleChange} className="form-control"/>
                        
                        <div className="row">
                            <div className="col-md-4">
                                Documento
                                <input value={this.state.contribuinte ? this.state.contribuinte.documento : ''}  onChange={this.aoAlterarDocumento} className="form-control" />
                            </div>
                            <div className="col-md-4">
                                Nome
                                <input value={this.state.contribuinte ? this.state.contribuinte.nome : ''} readOnly={true} className="form-control" />
                            </div>
                        </div>
                        <br/>
                        {
                            this.state.atualizando 
                            ?(<button onClick={this.atualizar} className="btn btn-primary">Atualizar</button>)
                            :(<button onClick={this.salvar} className="btn btn-success">Salvar</button>)
                        }
                        <button onClick={e => this.props.history.push('/consulta-lancamento')} className="btn btn-danger">Cancelar</button> 
                    </Card>
                </div>

            </div>
        )
    }
}
export default withRouter(CadastroLancamento)