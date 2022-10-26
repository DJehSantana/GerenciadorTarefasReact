import React from 'react';
import moment from 'moment';
import naoConcluido from '../assets/icones/notChecked.svg';
import concluido from '../assets/icones/checked.svg';

export const Item = props => {

    //recebe o objeto tarefa como props da API e faz o destructor
    const { tarefa } = props;
    //pega os dados a serem utilizados da tarefa
    const {dataPrevistaConclusao, dataConclusao, nome} = tarefa;


    //função para gerenciar texto a ser exibido da data de conclusão da tarefa
    const getDataTexto = (dtConclusao, dtPrevisao) => {
        if (dtConclusao) {
            return `Concluído em: ${moment(dtConclusao).format('DD/MM/yyyy')}`
        } else {
            return `Previsão de conclusão em: ${moment(dtPrevisao).format('DD/MM/yyyy')}`
        }
    };


    return (
        <div className="container-item">
            <img src= {dataConclusao ? concluido : naoConcluido} 
            alt= {dataConclusao ? "Tarefa concluida" : "Selecionar tarefa"} />
            <div>
                <p className={dataConclusao? "concluida" : ""}>{nome}</p>
                <span>{getDataTexto(dataConclusao, dataPrevistaConclusao)}</span>
            </div>

        </div>
    )
}