import React from 'react';
import imgVazio from '../assets/icones/imgvazio.svg';
import { Item } from './Item';

export const Listagem = props => {
    
    //quando vierem tarefas da API pelo props, vai desconstruí-las e atribuir a tarefas
    const {tarefas} = props;

    return (
        <div className='container-listagem'>

            { tarefas && tarefas.length > 0 ? 

                //se tiver tarefas vai usar o map para passar cada tarefa como props 
                //para o componente Item, do contrário exibe imagem sem tarefa
                tarefas?.map(tarefa => <Item tarefa={tarefa} key={tarefa.id}/> )
                : 
                <>
                    <img src={imgVazio} alt= 'Você não tem tarefas listadas' />
                    <p>Você ainda não possui tarefas cadastradas!</p>
                </>                
            }            
        </div>
    )
}