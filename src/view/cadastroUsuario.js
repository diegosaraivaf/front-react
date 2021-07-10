import React from 'react'
import UsuarioService from '../app/service/usuarioService'

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
        console.log(this.state)
        this.usuarioService.salvar(this.state).then(response => {
            console.log('usuario salvo com sucesso')
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
                Email
                <input name="email" onChange={this.handleChange}/>
                <br/>
                Senha
                <input name="senha" onChange={this.handleChange}/>
                <br/>
                <button onClick={this.salvar} >Salvar</button>
            </div>
        )
    }
}

export default CadastroUsuario
