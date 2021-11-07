import React from "react";
import Card from "../components/card";
import ContribuinteService from "../app/service/contribuinteService";
import { mensagemErro, mensagemSucesso } from "../components/toastr";
import { confirmPopup } from 'primereact/confirmpopup'

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
                        <td>
                            <button onClick={(e) => this.confirmarExclusao(e,contribuinte)} className="btn btn-danger">Excluir</button>
                            <button onClick={(e) => this.editar(contribuinte.id)} className="btn btn-primary">Editar</button>
                        </td>
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

    confirmarExclusao= (event,contribuinte) =>  {
        confirmPopup({
            target: event.currentTarget,
            message: 'Você tem tem certeza que deseja excluir este registro?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel:'Sim',
            rejectLabel:'Não',
            accept: () => this.deletar(contribuinte)
        });
    }

    editar = (idContribuinte) =>{
        this.props.history.push(`cadastro-contribuinte/${idContribuinte}`)
    }

    render(){
        return(
            <div>
                <div className="container">
                    <Card title="Consulta de Contribuinte">
                        <div className="row">
                            <div className="col-md-4">
                                Documento
                                <input className="form-control"/>
                            </div>
                            <div className="col-md-8">
                                Nome
                                <input className="form-control"/>
                            </div>
                        </div>
                        Endereco
                        <input className="form-control"/>
                        <br/>
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