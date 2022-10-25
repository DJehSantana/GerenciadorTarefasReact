import React from 'react';
import naoConcluido from '../assets/icones/notChecked.svg';
import concluido from '../assets/icones/checked.svg';

export const Item = props => {

    const { tarefa } = props;

    return (
        <div className="container-item">
            <img src= {naoConcluido} alt= "Selecionar tarefa" />
            <div>
                <p>{tarefa?.nome}</p>
                <p>Previsão de conclusão em: {tarefa?.dataPrevistaConclusao}</p>
            </div>

        </div>
    )
}