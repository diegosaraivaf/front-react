import React from 'react'
import {Route,Switch,HashRouter, Redirect} from 'react-router-dom'
import Login from '../view/login'
import CadastroUsuario from '../view/cadastroUsuario'
import Home from '../view/home'
import ConsultaLancamento from '../view/consultaLancamento'
import CadastroLancamento from '../view/cadastroLancamento'
import AutenticacaoService from '../app/service/autenticacaoService'
import CadastroContribuinte from '../view/cadastroContribuinte'
import ConsultaContribuinte from '../view/consultaContribuinte'
import ConsultaUsuario from '../view/consultaUsuario'

/* const autenticacaoService = new AutenticacaoService() */

function RotaAutenticada({component : Component, ...props}){
	return(
		<Route {...props} render={(componentProps) => {
			if(AutenticacaoService.isUsuarioAutenticado()){
				return (<Component {...componentProps} />)
			}else{
				return (<Redirect to={{pathname:'login',state:{from:componentProps.location}}}/>)
			}
		}} 
		/>
	)
}

function Rotas(){
	return(
		<HashRouter>
			<Switch>
				<Route exact path="/" component ={Login}/>
				<Route path="/login" component ={Login}/>
				<Route path="/cadastro-usuario" component ={CadastroUsuario}/>
				<RotaAutenticada path="/home" component ={Home}/>
				<RotaAutenticada path="/consulta-lancamento" component={ConsultaLancamento} />
				<RotaAutenticada path="/cadastro-lancamento/:id?" component={CadastroLancamento}/>
				<RotaAutenticada path="/consulta-contribuinte" component={ConsultaContribuinte}/>
				<RotaAutenticada path="/cadastro-contribuinte/:id?" component={CadastroContribuinte}/>
				<RotaAutenticada path="/consulta-usuario" component={ConsultaUsuario}/>
			</Switch>
		</HashRouter>	
	)
}
export default Rotas