import React from 'react'

function SelectMenu(props){
    const opcoes = props.lista.map((opt,index) => {
        return (
            <option key={index} value={opt.value}>{opt.label}</option>
        )
    })

    return(
        <select {...props}>
            {opcoes}
        </select>
    )
}

export default SelectMenu