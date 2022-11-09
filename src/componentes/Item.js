import React from 'react';
import moment from 'moment';
//import { Modal } from 'react-bootstrap';
import imgUpdate from '../assets/icones/icon-update.png';
import imgDelete from '../assets/icones/icon-delete.png';
import concluido from '../assets/icones/checked.svg';

export const Item = props => {

    //recebe o objeto tarefa como props da API e faz o destructor
    const { tarefa, selecionarTarefa} = props;
   
    const { dataPrevistaConclusao, dataConclusao, nome } = tarefa;    

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
        <div className={"container-item " + (dataConclusao ? "" : "ativo")}>
            <div>
                {dataConclusao && <img src={concluido} alt="Tarefa concluida" />}

                <p className={dataConclusao ? "concluida" : ""}>{nome}</p>
                <span>{getDataTexto(dataConclusao, dataPrevistaConclusao)}</span>
            </div>
            <div className="atualizar-deletar">
                {!dataConclusao && <button onClick={() => dataConclusao ? null : selecionarTarefa(tarefa)}><img src={imgUpdate} alt="Editar tarefa"/></button>}
                <button onClick={() => {selecionarTarefa(tarefa)}}><img src={imgDelete} alt="Deletar tarefa"/></button>

            </div>

        </div>
    )
}