import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import imgVazio from '../assets/icones/imgvazio.svg';
import { Item } from './Item';

export const Listagem = props => {
    
    //quando vierem tarefas da API pelo props, vai desconstruí-las e atribuir a tarefas
    const {tarefas} = props;

    //states do modal
    const [showModal, setShowModal] = useState(false);
    const [idTarefa, setIdTarefa] = useState(null);
    const [nomeTarefa, setNomeTarefa] = useState('');
    const [dataConclusao, setDataConclusao] = useState('');
    const [dataPrevistaConclusao, setDataPrevistaConclusao] = useState('');
    const [msgErro, setMsgErro] = useState('');

    //função que ativa edição da tarefa
    const selecionarTarefa = tarefa => {
        setIdTarefa(tarefa.id);
        setNomeTarefa(tarefa.nome);
        setDataPrevistaConclusao(tarefa.dataPrevistaConclusao);
        setDataConclusao(tarefa.dataConclusao);
        setShowModal(true);
    }

    return (
        <>
            <div className={"container-listagem " + (tarefas && tarefas.length > 0 ? "" : "vazia")}>

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

            {// modal para alteração de tarefas
}    
            <Modal show={showModal} onHide={setShowModal(false)} className="container-modal">
                <Modal.Body>
                    <p>Alterar uma tarefa</p>
                    {msgErro && <span className='error'>{msgErro}</span>}
                    <div className="inputs col-12">
                        <input type="text" name="nome"
                            placeholder="Nome da tarefa" value={nomeTarefa} 
                            onChange={evento => setNomeTarefa(evento.target.value)}/>

                        <input type="text" name="dataPrevistaConclusao"
                            placeholder="Data prevista de conclusão" value={dataPrevistaConclusao}
                            onChange={evento => setDataPrevistaConclusao(evento.target.value)}
                            onFocus={evento => evento.target.type = 'date'}
                            onBlur={evento => dataPrevistaConclusao ? evento.target.type = 'date' : evento.target.type = 'text'}/>

                        <input type="text" name="dataConclusao"
                            placeholder="Data conclusão" value={dataConclusao}
                            onChange={evento => setDataConclusao(evento.target.value)} 
                            onFocus={evento => evento.target.type = 'date'}
                            onBlur={evento => dataConclusao ? evento.target.type = 'date' : evento.target.type = 'text'} />
                    </div>                    
                </Modal.Body>
                <Modal.Footer>
                    <button>Salvar</button>
                    <button onClick={() => {
                        setShowModal(false)
                        setMsgErro('')
                        setNomeTarefa('')
                        setDataPrevistaConclusao('')
                    }}>Cancelar</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}