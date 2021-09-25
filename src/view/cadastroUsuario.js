import React from 'react'
import UsuarioService from '../app/service/usuarioService'
import Card from '../components/card'
import { mensagemSucesso } from '../components/toastr'

class CadastroUsuario extends React.Component{
    state = {
        email : '',
        senha : ''
    }
    constructor(){
        super()
        this.usuarioService =  new UsuarioService()
    }

    

    salvar = () =>{
        this.usuarioService.salvar(this.state).then(response => {
            mensagemSucesso('Usuario salvo com sucesso')
            this.props.history.push('/consulta-usuario')
        }).catch(erro => {
            console.log(erro.response.data)
        })
    }

    handleChange = (event) =>{
        const value = event.target.value
        const name = event.target.name

        this.setState({[name] : value})
    }

    render(){
        return(
            <div>
                <div className="container">
                    <Card title="Cadastro Usuario">
                        Email
                        <input name="email" onChange={this.handleChange} className="form-control"/>
                        Senha
                        <input name="senha" onChange={this.handleChange} className="form-control"/>
                        <button onClick={this.salvar} className="btn btn-success" >Salvar</button>
                        <button onClick={e => this.props.history.push('/consulta-usuario')} className="btn btn-danger">Cancelar</button>
                    </Card>
                </div>
            </div>
        )
    }
}

export default CadastroUsuario
