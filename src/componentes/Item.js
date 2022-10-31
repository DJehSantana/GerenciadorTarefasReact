import React from 'react';
import moment from 'moment';
import naoConcluido from '../assets/icones/notChecked.svg';
import concluido from '../assets/icones/checked.svg';

export const Item = props => {

    //recebe o objeto tarefa como props da API e faz o destructor
    const { tarefa } = props;
    //pega os dados a serem utilizados da tarefa
    const {selecionarTarefa} = props;
    const {dataPrevistaConclusao, dataConclusao, nome} = tarefa;


    //função para gerenciar texto a ser exibido da data de conclusão da tarefa
    const getDataTexto = (dtConclusao, dtPrevisao) => {
        if (dtConclusao) {
            //o moment formata como será exibida a data
            return `Concluído em: ${moment(dtConclusao).format('DD/MM/yyyy')}`
        } else {
            return `Previsão de conclusão em: ${moment(dtPrevisao).format('DD/MM/yyyy')}`
        }
    };

    // os elementos e classes mudam de acordo a se a tarefa está concluida ou não
    return (
        <div className={"container-item " + (dataConclusao ? "" : "ativo")} 
            onClick={() => dataConclusao ? null : selecionarTarefa(tarefa)}>
            <img src= {dataConclusao ? concluido : naoConcluido} 
            alt= {dataConclusao ? "Tarefa concluida" : "Selecionar tarefa"} />
            <div>
                <p className={dataConclusao? "concluida" : ""}>{nome}</p>
                <span>{getDataTexto(dataConclusao, dataPrevistaConclusao)}</span>
            </div>

        </div>
    )
}