import React from 'react'
import { AuthConsumer } from '../context/provedorAutenticacao'

/* const deslogar = () =>{
    AutenticacaoService.removerUsuarioAutenticado()
    window.location.reload();
}

const isUsuarioAutenticado = () => {
    console.log('isUsuarioauteticado',AutenticacaoService.isUsuarioAutenticado())
    return AutenticacaoService.isUsuarioAutenticado()
} */

function ItemLi({render,...props}){
    if(render){
        return(
            <li className="nav-item" >
                <a className="nav-link" onClick={props.onClick} href={props.href}>{props.label}</a>
            </li>
        )
    }else{
        return false;
    }
}

function Navbar(props){
    console.log('navebar')

    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <   span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    
                    
                    <ul className="navbar-nav">
                        {/* <ItemLi render={isUsuarioAutenticado()} label="Home" href="#/home"/> */}
                        {/* <ItemLi render={true} label="Home" href="#/home"/> */}

                        <ItemLi render={props.isUsuarioAutenticado} label="Usuários" href="#/cadastro-usuario"/>

                        <ItemLi render={props.isUsuarioAutenticado} label="Contribuinte" href="#/consulta-contribuinte"/>

                        <ItemLi render={props.isUsuarioAutenticado} label="Lançamentos" href="#/consulta-lancamento"/>

                        <ItemLi render={props.isUsuarioAutenticado} label="Sair" href="#/login" onClick={props.deslogar}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao}/>
        )}
    </AuthConsumer>
)