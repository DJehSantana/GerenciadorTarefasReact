import React from 'react';

export const Item = props => {

    const {tarefa} = props;

    return (
        <div className="container-item">
            <p>{tarefa.nome}</p>
        </div>
    )
}