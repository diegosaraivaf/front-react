import React from "react";
import Card from "../components/card";
import UsuarioService from "../app/service/usuarioService";

class ConsultaUsuario extends React.Component {

    constructor(){
        super()
        this.usuarioService = new UsuarioService()
    }

    state = {
        rows : []
    }

    pesquisar = () =>{
        this.usuarioService.pesquisar().then(response => {
            const linhas = response.data.map((usuario,index) =>{
                return (
                    <tr key={index}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                    </tr>
                )
            })

            this.setState({rows : linhas})
        }).catch(error =>{

        })
    }

    render(){
        return(
            <div>
                <div className="container">
                    <Card title="Consulta de Usuarios">
                        input1
                        <input className="form-control"/>
                        input2
                        <input className="form-control"/>
                        <button onClick={this.pesquisar}  className="btn btn-success">Pesquisar</button>
                        <button onClick={e => this.props.history.push('cadastro-usuario')} className="btn btn-danger">Cadastrar</button>
                    </Card>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.rows}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default ConsultaUsuario