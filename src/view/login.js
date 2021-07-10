import React from 'react'
import Card from  '../components/card'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { mensagemErro } from '../components/toastr'


class Login extends  React.Component{
    state ={
        email: '',
        senha: ''
    }

    validar(){
        /* aula 126 */
        const msgs = []

        if(!this.state.email){
            msgs.push('Campo email e obrigatorio')
        }

        return msgs
    }

    entrar = ()=>{
/*         console.log('email:' , this.state.email)
        console.log('senha:' , this.state.senha) */

        const msgs = this.validar()
        if(msgs && msgs.length > 0){
            msgs.forEach((msg,index) => {
                mensagemErro(msg)
            })
            return false
        }

        console.log('passo por aqui ')


        axios.get('http://localhost:8080/api/pessoa/1',
        {
            nome: this.state.email,
            endereco: this.state.senha
        }).then(response =>{
            console.log(response)

            /* adicionad o usuario logado em uma "sessao",no localstorage */
            localStorage.setItem('_usuario_logado', JSON.stringify(response.data))

            /* pega o usuario do localstorage */
            const usuarioLogadoString = localStorage.getItem('_usuario_logado')
            const usuarioLogado = JSON.parse(usuarioLogadoString)
            console.log('usuario logado > ',usuarioLogado)

            /* concatenacao  */
            /* axios.get(`http://localhost:8080/api/${usuarioLogado.id}`) */

            this.props.history.push('/home')
        }).catch(erro => {
            console.log(erro.response)
            mensagemErro(erro.response.data.descricao)
        })
    }

    prepararCadastrar = () =>{
        this.props.history.push('cadastro-usuario')
    }

    /* forma mais facil de alterar os valores do states com input */
    handleChange = (event) =>{
        const value = event.target.value
        const name = event.target.name

        this.setState({[name] : value})
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={{position:'relative',left:'300px'}}>
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg12">
                                    <div className="bs-componente">
                                        <fieldset>
                                            <div className="form-grop">
                                                <label>Email</label>
                                                <input type="email" 
                                                value={this.state.email} 
                                                name="email"
                                                onChange={this.handleChange}  
                                                className="form-control" 
                                                area-aria-describedby="emailHelp" 
                                                placeholder="Digite o email"/>
                                            </div>
                                            <div className="form-grop">
                                                <label>Senha</label>
                                                <input value={this.state.senha} 
                                                onChange={e =>this.setState({senha:e.target.value})} type="password" className="form-control" 
                                                placeholder="Senha"/>
                                            </div> 
                                            <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                            <button onClick={this.prepararCadastrar} className="btn btn-danger">Cadastrar</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

}
export default withRouter(Login)