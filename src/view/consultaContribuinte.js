import React from "react";
import Card from "../components/card";
import ContribuinteService from "../app/service/contribuinteService";
import { mensagemErro, mensagemSucesso } from "../components/toastr";

class ConsultaContribuinte extends React.Component{
    state = {
        contribuintes: []
    }

    constructor(){
        super()
        this.contribuinteService = new ContribuinteService()
    }

    pesquisar = () =>{
        this.contribuinteService.pesquisar().then(response =>{
            const linhas = response.data.map((contribuinte,index) => {
                return (
                    <tr key={index}>
                        <td>{contribuinte.nome}</td>
                        <td>{contribuinte.documento}</td>
                        <td>{contribuinte.endereco}</td>
                        <td><butto onClick={e =>  this.deletar(contribuinte)} className="btn btn-danger">Excluir</butto> </td>
                    </tr>
                )
            })

            this.setState({contribuintes : linhas})
        }).catch(error =>{
            mensagemErro(error.response.data)
        })
    }

    deletar = (contribuinte) => {
        this.contribuinteService.deletar(contribuinte).then(response =>{
            this.pesquisar()
            mensagemSucesso('Contribuinte excluido com sucesso')
        }).catch(error =>{
            mensagemErro(error.response.data)
        })
    }

    render(){
        return(
            <div>
                <div className="container">
                    <Card title="Consulta de Contribuinte">
                        <button onClick={this.pesquisar} className="btn btn-success">Pesquisar</button>
                        <button onClick={e => this.props.history.push('cadastro-contribuinte')} className="btn btn-danger">Cadastrar</button>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Documento</th>
                                    <th>Endereco</th>
                                </tr>

                            </thead>
                            <tbody>
                                {this.state.contribuintes}
                            </tbody>

                        </table>
                    </Card>
                </div>
            </div>
        )
    }

}

export default ConsultaContribuinte