import React from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import imgSave from '../assets/icones/icon-save.png';
import imgCancel from '../assets/icones/icon-cancel.svg';
import imgDelete from '../assets/icones/icon-delete.png';
import imgVazio from '../assets/icones/imgvazio.svg';
import { executaRequisicao } from '../services/api';
import { Item } from './Item';

export const Listagem = props => {

    //quando vierem tarefas da API pelo props, vai desconstruí-las e atribuir a tarefas
    const { tarefas, getTarefasComFiltro } = props;

    //states do modal
    const [showModal, setShowModal] = useState(false);
    const [msgErro, setMsgErro] = useState('');
    const [idTarefa, setIdTarefa] = useState(null);
    const [nomeTarefa, setNomeTarefa] = useState('');
    const [dataConclusao, setDataConclusao] = useState('');
    const [dataPrevistaConclusao, setDataPrevistaConclusao] = useState('');

    //função que ativa edição da tarefa
    const selecionarTarefa = tarefa => {

        setMsgErro('');
        setIdTarefa(tarefa.id);
        setNomeTarefa(tarefa.nome);
        setDataPrevistaConclusao(moment(tarefa.dataPrevistaConclusao).format('yyyy-MM-DD'));
        setDataConclusao(tarefa.dataConclusao);
        setShowModal(true);
    }

    const atualizarTarefa = async () => {

        try {
            //tratamento de erro
            if (!nomeTarefa || !dataPrevistaConclusao) {
                setMsgErro('Favor informar corretamente nome e data');
                return;
            }
            //atribuindo valor dos inputs as propriedades do body que será enviado 
            //como parâmetro para cadastro da tarefa
            const body = {
                nome: nomeTarefa,
                dataPrevistaConclusao: dataPrevistaConclusao,
                dataConclusao: dataConclusao
            }

            //caso dados sejam preenchidos corretamente executa requisição de cadastro da tarefa
            await executaRequisicao('tarefa/' + idTarefa, 'put', body);

            //limpando campos e fechando o modal
            setIdTarefa(null);
            setNomeTarefa('');
            setDataPrevistaConclusao('')
            setDataConclusao('');
            setMsgErro('');
            setShowModal(false);

            //chamando filtro de tarefas
            await getTarefasComFiltro();

        } catch (e) {
            console.log(e);
            if (e?.response?.data?.erro) {
                setMsgErro(e.response.data.erro);
            } else {
                setMsgErro('Não foi possível atualizar a tarefa, fale com o administrador');
            }
        }
    }

    const deletarTarefa = async () => {

        try {
            //tratamento de erro
            if (!idTarefa) {
                setMsgErro('Favor informar a tarefa a ser excluída');
                return
            } else {
                console.log(idTarefa);
            }

            //caso dados sejam preenchidos corretamente executa requisição de cadastro da tarefa
            await executaRequisicao('tarefa/' + idTarefa, 'delete');

            setMsgErro('');
            setShowModal(false);

            //chamando filtro de tarefas
            await getTarefasComFiltro();

        } catch (e) {
            console.log(e);
            if (e?.response?.data?.erro) {
                setMsgErro(e.response.data.erro);
            } else {
                setMsgErro('Não foi possível excluir a tarefa, fale com o administrador');
            }
        }
    }


    return (
        <>
            <div className={"container-listagem " + (tarefas && tarefas.length > 0 ? "" : "vazia")}>

                {tarefas && tarefas.length > 0 ?

                    //se tiver tarefas vai usar o map para passar cada tarefa como props 
                    //para o componente Item, do contrário exibe imagem sem tarefa
                    tarefas?.map(tarefa => <Item tarefa={tarefa} key={tarefa.id} selecionarTarefa={selecionarTarefa} 
                        showModal={() => setShowModal(true)}/>)
                    :
                    <>
                        <img src={imgVazio} alt='Você não tem tarefas listadas' />
                        <p>Você ainda não possui tarefas cadastradas!</p>
                    </>
                }
            </div>


            <Modal show={showModal} onHide={() => setShowModal(false)} className="container-modal">
                <Modal.Body>
                    <p>Altualizar tarefa</p>
                    {msgErro && <span className='error'>{msgErro}</span>}
                    <div className="inputs col-12">
                        <input type="text" name="nome"
                            placeholder="Nome da tarefa" value={nomeTarefa}
                            onChange={evento => setNomeTarefa(evento.target.value)} />

                        <input type="text" name="dataPrevistaConclusao"
                            placeholder="Data prevista de conclusão" value={dataPrevistaConclusao}
                            onChange={evento => setDataPrevistaConclusao(evento.target.value)}
                            onFocus={evento => evento.target.type = 'date'}
                            onBlur={evento => dataPrevistaConclusao ? evento.target.type = 'date' : evento.target.type = 'text'} />

                        <input type="text" name="dataConclusao"
                            placeholder="Data Conclusão" value={dataConclusao}
                            onChange={evento => setDataConclusao(evento.target.value)}
                            onFocus={evento => evento.target.type = 'date'}
                            onBlur={evento => dataConclusao ? evento.target.type = 'date' : evento.target.type = 'text'} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='modal-icons'>
                        <button onClick={atualizarTarefa}> <img src={imgSave} alt="Salvar alterações"/></button>                   
                        <button onClick={() => {setShowModal(false)}}> <img src={imgCancel} alt= "Cancelar alterações" /></button>
                        <button onClick={deletarTarefa}> <img src={imgDelete} alt="Deletar tarefa"/></button>  
                    </div>
                </Modal.Footer>
            </Modal>


{ /*
            <Modal show={showModal} onHide={() => setShowModal(false)} className="container-modal">
                <Modal.Body>
                    <p>Tem certeza que deseja excluir essa tarefa?</p>
                    {msgErro && <span className='error'>{msgErro}</span>}

                </Modal.Body>
                <Modal.Footer>
                    <button onClick={deletarTarefa}>Sim</button>

                    <button onClick={() => {
                        setShowModal(false)
                        setMsgErro('');
                    }}>Cancelar</button>
                </Modal.Footer>
            </Modal>
            */
        }
        </>
        /*  */

    )
}