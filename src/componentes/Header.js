import React from 'react';
import logo from '../assets/icones/Logo.svg';
import exit from '../assets/icones/exit.svg';
import adicionar from '../assets/icones/adicionar.svg';

export const Header = props => {

    //recebendo showModal na props
    const {showModal} = props;

    const nomeCompleto = localStorage.getItem('usuarioNome');
    //split-separa a string em elementos de um array/pega o primeiro elemento 
    const primeiroNome = nomeCompleto?.split(' ')[0] || ' ';

    return (
        <div className="container-header">
            <img className="logo" src={logo} alt= "Logo Devaria"/>
            <button onClick={showModal}> <img src={adicionar} alt= "Adicionar tarefa" />Adicionar tarefa</button>
            <div className="mobile">
                <span>Olá, {primeiroNome}</span>
                <img className='sair' src={exit} alt= "Sair" onClick={props.sair} />
            </div>
            <div className="desktop">
                <span>Olá, {primeiroNome}</span>
                <img className='sair' src={exit} alt= "Sair" onClick={props.sair} />
            </div>
        </div>
    )
}