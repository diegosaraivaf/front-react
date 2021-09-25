import React from 'react'
import SelectMenu from '../components/selectMenu'
import LancamentoService from '../app/service/lancamentoService'
import { mensagemErro,mensagemSucesso } from '../components/toastr'
import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import currencyFormatter from 'currency-formatter'
import {ConfirmDialog} from 'primereact/confirmdialog'

class ConsultaLancamento extends React.Component {

    state = {
        tipo : '',
        lancamentos : [] ,
        rows :[],
        confirmacaoCancelamentoVisivel : false,
        lancamentoSelecionado : {}
    }

    constructor(){
        super()
        this.lancamentoService = new LancamentoService()
    }

    handleChange = (event) =>{
        const value = event.target.value
        const name = event.target.name

        this.setState({[name] : value})
    }

    deletar = () =>{
        this.lancamentoService.deletar(this.state.lancamentoSelecionado.id).then(response =>{
           /*  const lancamentos = this.state.lancamentos
            console.log(lancamentos)
            const index  = lancamentos.indexOf(lancamento)
            console.log(index)
            lancamentos.splice(index,1)
            console.log(lancamentos)
            this.setState(lancamentos) */

            mensagemSucesso('Lancamento deletado com sucesso.')
            this.pesquisar()
            this.setState({confirmacaoCancelamentoVisivel : false})
        }).catch(error =>{
            console.log(error)
        })
    }

    confirmarDelecao = (lancamento) => {
        this.setState({confirmacaoCancelamentoVisivel:true,lancamentoSelecionado : lancamento})
    }

    editar = (id) => {
        this.props.history.push(`cadastro-lancamento/${id}`)
    }

    pesquisar = () =>{
        
        const lancamentoFiltro  = {
            id: null,
            tipo: this.state.tipo
        }
        
        this.lancamentoService.consultar(lancamentoFiltro).then(response =>{
            this.setState({lancamentos:response.data})

            const trs =  this.state.lancamentos.map((lancamento,index) =>{
                return (
                    <tr key={index}>
                        <td>{lancamento.contribuinte ? lancamento.contribuinte.documento 
                        + ' - '+ lancamento.contribuinte.nome : ''}</td>
                        <td>{lancamento.tipoLancamento}</td>
                        <td>{currencyFormatter.format(lancamento.valor,{locale:'pt-BR'})}</td>
                        <td>
                            <button onClick={e => this.editar(lancamento.id)} className="btn btn-primary">Editar</button> 
                            <button onClick={e => this.confirmarDelecao(lancamento)} className="btn btn-danger">Excluir</button>
                        </td>
                    </tr>
                )
            })
            
            this.setState({rows : trs})
        }).catch(error =>{
            /* debugge */
            if(error.message){
                mensagemErro('Nao foi possivel acessa o servidor')
            }
            else if(error.response) {
                mensagemErro(error.response.data)
            }
            
        })
    }

    prepararCadastro = () =>{
        this.props.history.push('cadastro-lancamento')
    }


    render(){
        const tiposLancamentos = this.lancamentoService.tiposLancamentos()

        return(
            <div>
                <div className="container">
                    <Card title="Consulta de Lancamentos">
                        Tipo
                        <SelectMenu name="tipo" lista={tiposLancamentos} onChange={this.handleChange} 
                        className="form-control"/>
                        Tipo
                        <input name="tipo" onChange={this.handleChange} className="form-control"/>
                        <button onClick={this.pesquisar} className="btn btn-success">Pesquisar</button>
                        <button onClick={this.prepararCadastro} className="btn btn-danger">Cadrastrar</button> 

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Contribuinte</th>
                                    <th>Tipo</th>
                                    <th>Valor</th>
                                </tr>

                            </thead>
                            <tbody>
                                {this.state.rows}
                            </tbody>

                        </table>
                        
                        <ConfirmDialog 
                        visible={this.state.confirmacaoCancelamentoVisivel} 
                        onHide={() => this.setState({confirmacaoCancelamentoVisivel : false})} 
                        message="Você realmente deseja excluir este lancamento?"
                        header="Confirmação" 
                        icon="pi pi-exclamation-triangle" 
                        accept={() =>this.deletar()} 
                        reject={() => this.setState({confirmacaoCancelamentoVisivel : false})} />
                    </Card>
                </div>
            </div>
        )
    }
}

export default withRouter(ConsultaLancamento)