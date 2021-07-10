import React from 'react'
import {Route,Switch,HashRouter} from 'react-router-dom'
import Login from '../view/login'
import CadastroUsuario from '../view/cadastroUsuario'
import Home from '../view/home'
import ConsultaLancamento from '../view/consultaLancamento'
import CadastroLancamento from '../view/cadastroLancamento'

function Rotas(){
	return(
		<HashRouter>
			<Switch>
				<Route path="/login" component ={Login}/>
				<Route path="/cadastro-usuario" component ={CadastroUsuario}/>
				<Route path="/home" component ={Home}/>
				<Route path="/consulta-lancamento" component={ConsultaLancamento} />
				<Route path="/cadastro-lancamento/:id?" component={CadastroLancamento}/>
			</Switch>
		</HashRouter>	
	)
}
export default Rotas