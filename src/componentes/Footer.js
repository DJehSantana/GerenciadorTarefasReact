import React from 'react';
import adicionar from '../assets/icones/adicionar.svg';

export const Footer = props => {

    //recebe nas props o showModal
    const {showModal} = props;

    //getFullYear - seleciona o ano atual
    return (
        <div className="container-footer">
            <button onClick={showModal}><img src={adicionar} alt= "Adicionar tarefa"/>Adicionar tarefa</button>
            <span>@ Copyright {new Date().getFullYear()} Devaria. Todos os direitos reservados</span>
        </div>
    )
}