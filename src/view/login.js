import React from 'react'
import Card from  '../components/card'
import { withRouter } from 'react-router-dom'
import { mensagemErro } from '../components/toastr'
import UsuarioService from '../app/service/usuarioService'
import { AuthContext } from '../context/provedorAutenticacao'


class Login extends  React.Component{
    componentDidMount(){console.log('Login - CRIADA')}
    componentDidUpdate(){console.log('Login - ATUALIZADA')}
    componentWillUnmount(){console.log('Login - REMOVIDA')}

    constructor(){
        super()
        this.usuarioService = new UsuarioService()
    }
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
        /* else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Informe um email valido')
        } */

        if(!this.state.senha){
            msgs.push('Campo senha obrigatorio')
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
        
        this.usuarioService.autenticar(
        {
            email: this.state.email,
            senha: this.state.senha
        }).then(response =>{

            /* adicionad o usuario logado em uma "sessao",no localstorage */
            /* LocalStorageService.adicionarItem('_usuario_logado', response.data) */

            this.context.iniciarSessao(response.data)

            /* pega o usuario do localstorage */
            /* const usuarioLogado = localStorage.getItem('_usuario_logado') */

            /* concatenacao  */
            /* axios.get(`http://localhost:8080/api/${usuarioLogado.id}`) */

            this.props.history.push('/home')
         /*    ApiService.registrarToken(response.data.token) */
           /*  window.location.reload()  */
            
        }).catch(erro => {
            console.log(erro)
            mensagemErro(erro.response.data)
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

Login.contextType = AuthContext

export default withRouter(Login)