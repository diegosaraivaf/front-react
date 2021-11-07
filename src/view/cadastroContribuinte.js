import React from 'react'
import Card from '../components/card'
import ContribuinteService from '../app/service/contribuinteService' 
import { mensagemErro,mensagemSucesso } from '../components/toastr'

class CadastroContribuinte extends React.Component {
    constructor(){
        super()
        this.contribuinteService = new ContribuinteService()
    }

    componentDidMount(){
        const parametros = this.props.match.params

        if(parametros.id){
            this.contribuinteService.obterPorId(parametros.id).then(response =>{
                this.setState({...response.data})
                console.log('teste')
            }).catch(error =>{
                console.log(error)
            })
        }
    }

    state = {
        documento : '',
        nome : '',
        endereco : ''
    }

    handleChange = (event) =>{
        const value = event.target.value
        const name = event.target.name

        this.setState({[name] : value})
    }

    salvar = () =>{
        const {documento,nome,endereco} = this.state
        const contribuinte = {
            documento,
            nome,
            endereco
        }
         this.contribuinteService.salvar(contribuinte).then(response =>{
            mensagemSucesso('Contribuinte cadastrado com sucesso.')
            this.props.history.push('consulta-contribuinte')
         }).catch(error =>{
            mensagemErro(error.response.data)
         })
    }

    render(){
        return(
            <div>
                <div className="container">
                    <Card title="Cadastro contribuinte" >
                        <div className="row">
                            <div className="col-md-4">
                                Documento
                                <input value={this.state.documento} name="documento" 
                                onChange={this.handleChange} className="form-control"/>
                            </div>
                            <div className="col-md-8">
                                Nome
                                <input value={this.state.nome} name="nome" 
                                onChange={this.handleChange} className="form-control"/>
                            </div>
                        </div>
                        Endereco
                        <input value={this.state.endereco} name="endereco" 
                        onChange={this.handleChange}className="form-control"/>
                        <br/>
                        <button onClick={this.salvar} className="btn btn-success">Salvar</button>
                        <button onClick={e => this.props.history.push('/consulta-contribuinte')} className="btn btn-danger">Cancelar</button>
                    </Card>
                </div>
            </div>
        )
    }

}
export default CadastroContribuinte