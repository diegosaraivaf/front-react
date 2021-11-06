import React from 'react'
import LancamentoService from '../app/service/lancamentoService'
import ContribuinteService from '../app/service/contribuinteService'
import Card from '../components/card'
import { withRouter } from 'react-router-dom'
import { mensagemErro,mensagemSucesso } from '../components/toastr'
import SelectMenu from '../components/selectMenu'
import { DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';

class CadastroLancamento extends React.Component{
    constructor(){
        super()
        this.lancamentoService = new LancamentoService()
        this.contribuinteService = new ContribuinteService();
    }

    state = {
        id : '',
        tipoLancamento : '',
        valor : '',
        contribuinte : {
            id: '',
            nome: '',
            documento: '',
            endereco: ''
        },
        rows : [],
        parcelas :[new Date()],
        qtdParcela : '',
        atualizando : false
        ,x:''
        ,dataTeste : new Date()
    }

    componentDidMount(){
        const parametros = this.props.match.params
        
        if(parametros.id){
            this.lancamentoService.obterPorId(parametros.id).then(response =>{
                let parcelas = response.data.parcelas
                for(var i = 0; i < parcelas.length; i++){
                   
                    if(parcelas[i].dataVencimento){
                        /*converte string da api em Date do java scrip.necessario fazer isso pq 
                        date so aceita o forma yyyy-mm-dd e a string esta no formato dd-mm-yyyy.
                        o split foi necessario pq por algum motivo a conversao direta da string esta 
                        subtraindo 1 dia .
                        */
                        var dateParts = parcelas[i].dataVencimento.split("-");
                        var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
                        parcelas[i].dataVencimento = new Date(date) 
                        

                    }else{
                        parcelas[i].dataVencimento = '' 
                    }
                }

                /* spread opetator - seta altomaticamente os atributos com o mesmo nome*/
                this.setState({
                    ...response.data,
                    atualizando : true,
                    qtdParcela : response.data.parcelas.length,
                    parcelas:parcelas
                }, () => { 
                    /* this.preencherTabelaComParcelas() */
                   
                    /* this.setState({parcelas})  */
                })
                
               

            }).catch(error =>{
                console.log(error)
              /*   if(error.response.data){
                    mensagemErro(error.response.data)
                } */
            })
        }
        

    }

    handleChange = (event) =>{
        const value = event.target.value
        const name = event.target.name

        this.setState({[name] : value})
        console.log(name,value)

      /*   const parcelasNova = [{valor : 111111}]  
        this.setState({
            parcelas: parcelasNova
        }, () =>{
        console.log(this.state.parcelas)
        }
        ) */
        


    }

    handleValorParcela = (event) => {
        let parcelas = this.state.parcelas;
        for(let i = 0; parcelas.length > i; i++){
            if(i == event.target.name){
                parcelas[i].valor = event.target.value;
                this.setState ({parcelas});
                break;
            }
        }
    }

    handleVencimentoParcela = (event) => {
        let parcelas = this.state.parcelas;
        for(let i = 0; parcelas.length > i; i++){
            if(i == event.target.name){
                let newDate = event.target.value
                parcelas[i].dataVencimento = newDate;
                this.setState ({parcelas});
                break;
            }
        }
    }   

    salvar = () =>{
        const  {tipoLancamento,valor,contribuinte,parcelas} = this.state
        
        const lancamento = {
            tipoLancamento,
            valor,
            contribuinte,
            parcelas
        }
        this.lancamentoService.salvar(lancamento).then(response =>{
            mensagemSucesso('Lancamento salvo com sucesso')
            this.props.history.push('/consulta-lancamento')
        }).catch(error =>{
            mensagemErro(error.response.data)
        })
    }

    atualizar = () =>{
        console.log(this.state)
        const  {id,tipoLancamento,valor,contribuinte,parcelas} = this.state
        const lancamento = {
            id,
            tipoLancamento,
            valor,
            contribuinte,
            parcelas
        }
        this.lancamentoService.atualizar(lancamento).then(response =>{
            mensagemSucesso('Lancamento atualizado com sucesso')
            this.props.history.push('/consulta-lancamento')
        }).catch(error =>{
            mensagemErro(error.response.data)
        })
    }

    aoAlterarDocumento = (event) => {
        /* this.setState({contribuinte: {documento : event.target.value}}) */
    
        this.setState(prevState => ({contribuinte :{...prevState.contribuinte, documento: event.target.value}}));  
       

        this.contribuinteService.buscarPorDocumento(event.target.value).then(response =>{
            if(response.data){
                this.setState({
                    contribuinte : response.data
                })   
                console.log(this.state)
            }else{
                this.setState({
                    contribuinte : {
                        id:'',
                        nome:'',
                        documento:event.target.value,
                        endereco:''
                    }
                })   
            }
        }).catch({

        })
    } 

    atualizarParcelas = (event) =>{
        const qtdParcela = event.target.value
        const valor = this.state.valor
        this.setState({qtdParcela : qtdParcela}, () => { this.preencherTabelaComParcelas()})

        const listaParcelas = []
        const valorDivisao = (valor/qtdParcela).toFixed(2)
        for (var i = 0; i < qtdParcela; i++) {
            listaParcelas.push({valor : valorDivisao})
        }
        this.setState({parcelas : listaParcelas})

    }

    preencherTabelaComParcelas = () => {
       
        const qtdParcela = this.state.qtdParcela
        const valor = this.state.valor

        if(!valor){
            return 
        }
        const valorDivisao = (valor/qtdParcela).toFixed(2) 
        const linhas = []

        for (var i = 0; i < this.state.qtdParcela; i++) {
            linhas.push(
                <tr key={i}>
                    <td>{valorDivisao}</td>
                </tr>
            )
            
        }
        this.setState({rows : linhas})
    }

  /*   tabelaChange = (e) =>{
        const value = e.target.value
        const posicao = e.target.posicao
        const name = e.target.name
        
    } */

    render(){
        const tiposLancamentos = this.lancamentoService.tiposLancamentos()

   

        return(
            <div>
                <div className="container">
                    <Card title={this.state.atualizando ? 'Atualização de Lancamento' : 'Cadastro de Lancamento'}>

                        Tipo
                        <SelectMenu name="tipoLancamento" value={this.state.tipoLancamento} 
                        lista={tiposLancamentos} 
                        onChange={this.handleChange} 
                        className="form-control"/>

                        Valor
                        <input value={this.state.valor} name="valor" onChange={this.handleChange} className="form-control"/>
                        
                        <div className="row">
                            <div className="col-md-4">
                                Documento
                                <input value={this.state.contribuinte ? this.state.contribuinte.documento : ''}  onChange={this.aoAlterarDocumento} className="form-control" />
                            </div>
                            <div className="col-md-4">
                                Nome
                                <input value={this.state.contribuinte ? this.state.contribuinte.nome : ''} readOnly={true} className="form-control" />
                            </div>
                        </div>
     
                        Qtd. Parcelas 
                        <input value={this.state.qtdParcela} onChange={this.atualizarParcelas} name="qtdParcela"  className="form-control"/>

                   {/*      <table className="table">
                        <thead>
                                <tr>
                                    <th>Valor</th>
                                </tr>

                            </thead>
                            <tbody>
                                {this.state.rows}
                            </tbody>
                        </table> */}

                        <DataTable value={this.state.parcelas} >
                            <Column  header="Numero"/>
                          
                            <Column 
                                body={(parcela,props) => <input value={parcela.valor} name={props.rowIndex}  onChange={this.handleValorParcela} /> }
                                header="Valor" />
                             <Column 
                                body={(parcela,props) =>
                                 <Calendar  id="basic" value={parcela.dataVencimento ? parcela.dataVencimento: new Date()} name={props.rowIndex} onChange={this.handleVencimentoParcela}  	dateFormat='dd/mm/yy'/> 
                                 }
                                header="Vencimento" field="Index" /> 
                        </DataTable>
                        
                        <br/>
                        {
                            this.state.atualizando 
                            ?(<button onClick={this.atualizar} className="btn btn-primary">Atualizar</button>)
                            :(<button onClick={this.salvar} className="btn btn-success">Salvar</button>)
                        }
                        <button onClick={e => this.props.history.push('/consulta-lancamento')} className="btn btn-danger">Cancelar</button> 
                    </Card>
                </div>

            </div>
        )
    }
}
export default withRouter(CadastroLancamento)