import React from 'react'
import LancamentoService from '../app/service/lancamentoService'
import Card from '../components/card'
import { withRouter } from 'react-router-dom'
import { mensagemErro,mensagemSucesso } from '../components/toastr'
import SelectMenu from '../components/selectMenu'

class CadastroLancamento extends React.Component{
    constructor(){
        super()
        this.lancamentoService = new LancamentoService()
    }

    state = {
        id : null,
        tipoLancamento : '',
        valor : '',
        atualizando : false
    }

    componentDidMount(){
        const parametros = this.props.match.params
        
        if(parametros.id){
            this.lancamentoService.obterPorId(parametros.id).then(response =>{

                /* spread opetator - seta altomaticamente os atributos com o mesmo nome*/
                this.setState({...response.data,atualizando : true})
    
            }).catch(error =>{
                mensagemErro(error.response.data)
            })
        }
        

    }

    handleChange = (event) =>{
        const value = event.target.value
        const name = event.target.name

        this.setState({[name] : value})
    }

    salvar = () =>{
        const  {tipoLancamento,valor} = this.state
        const lancamento = {
            tipoLancamento,
            valor
        }
        this.lancamentoService.salvar(lancamento).then(response =>{
            mensagemSucesso('Lancamento salvo com sucesso')
            this.props.history.push('/consulta-lancamento')
        }).catch(error =>{
            mensagemErro(error.response.data)
        })
    }

    atualizar = () =>{
        const  {id,tipoLancamento,valor} = this.state
        const lancamento = {
            id,
            tipoLancamento,
            valor
        }
        this.lancamentoService.atualizar(lancamento).then(response =>{
            mensagemSucesso('Lancamento atualizado com sucesso')
            this.props.history.push('/consulta-lancamento')
        }).catch(error =>{
            mensagemErro(error.response.data)
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
                        <input value={this.state.valor} name="valor"onChange={this.handleChange} className="form-control"/>
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