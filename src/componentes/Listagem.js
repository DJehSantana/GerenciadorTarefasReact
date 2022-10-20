import React from 'react';
import imgVazio from '../assets/icones/imgvazio.svg';

export const Listagem = () => {
    return (
        <div className='container-listagem'>
            <img src={imgVazio} alt= 'Você não tem tarefas listadas' />
            <p>Você ainda não possui tarefas cadastradas!</p>

        </div>
    )
}