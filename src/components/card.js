import React from 'react'

class Card extends  React.Component{
    render(){
        return(
            <div className="card md-3">
               
                {/* por padrao o componente tem o atributo props que serve para passar propriedade por parametr
                quando o componente for chamado,neste caso esta sendo criado o parametro title */}
                <h3 className="card-header">{this.props.title}</h3>
                <div className="card-body">
                
                    {/* neste caso o atributo props.children e um atributo interno do react */} 
                    {this.props.children}
                </div>

            </div>
        )

    }

}
export default Card 