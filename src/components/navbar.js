import React from 'react'
import AutenticacaoService from '../app/service/autenticacaoService'

const deslogar = () =>{
    AutenticacaoService.removerUsuarioAutenticado()
}

const isUsuarioAutenticado = () => {
    console.log('isUsuarioauteticado',AutenticacaoService.isUsuarioAutenticado())
    return AutenticacaoService.isUsuarioAutenticado()
}

function ItemLi({render,...props}){
    console.log('render ' ,render)
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

function Navbar(){
    console.log('passo navbar')
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <   span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    
                    
                    <ul className="navbar-nav">
                        <ItemLi render={isUsuarioAutenticado()} label="Home" href="#/home"/>

                        <ItemLi render={isUsuarioAutenticado()} label="Usuários" href="#/cadastro-usuario"/>

                        <ItemLi render={isUsuarioAutenticado()} label="Contribuinte" href="#/cadastro-contribuinte"/>

                        <ItemLi render={isUsuarioAutenticado()} label="Lançamentos" href="#/consulta-lancamento"/>

                        <ItemLi render={isUsuarioAutenticado()} label="Sair" href="#/login" onClick={deslogar}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar