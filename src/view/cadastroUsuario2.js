import React from 'react'
import Card from '../components/card'

class CadastroUsuario extends React.Component{
    state= {
        nome : '',
        email : '',
        senha : '',
        senhaRepeticao : ''
    }

    cadastrar = () =>{
        console.log(this.state)
    }

    render(){
        return(
            <div className="container">
                <Card title="Cadastro de Usuario">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-componente">
                                <div className="form-grop">
                                    <label>Nome *</label>
                                    <input value={this.state.nome} 
                                    onChange={e =>this.setState({nome:e.target.value})}  className="form-control" 
                                     placeholder="nome"/>
                                </div>

                                <div className="form-grop">
                                    <label>Email *</label>
                                    <input value={this.state.email} 
                                    onChange={e =>this.setState({email:e.target.value})}  className="form-control" 
                                     placeholder="email"/>
                                </div>

                                <div className="form-grop">
                                    <label>Senha *</label>
                                    <input value={this.state.senha} 
                                    onChange={e =>this.setState({senha:e.target.value})} type="password"  className="form-control" 
                                     placeholder="senha"/>
                                </div>

                                <div className="form-grop">
                                    <label>Repetir Senha *</label>
                                    <input value={this.state.senhaRepeticao} 
                                    onChange={e =>this.setState({senhaRepeticao:e.target.value})} type="password" className="form-control" 
                                     placeholder="repetir senha"/>
                                </div>

                                <button onClick={this.cadastrar} className="btn btn-success">Salvar</button>
                                <button className="btn btn-danger">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </Card>
                cadastro usuario

            </div>

        )
    }


}

export default CadastroUsuario