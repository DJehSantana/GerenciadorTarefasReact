import React, { useState } from 'react';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import concluido from '../assets/icones/checked.svg';

export const Item = props => {

    //recebe o objeto tarefa como props da API e faz o destructor
    const { tarefa } = props;
    //pega os dados a serem utilizados da tarefa
    const {selecionarTarefa, deletarTarefa, msgErro} = props;
    const {dataPrevistaConclusao, dataConclusao, nome} = tarefa;

    const [Erro, setErro] = useState('');

    const [showModal, setShowModal] = useState(false);
    
    //função para gerenciar texto a ser exibido da data de conclusão da tarefa
    const getDataTexto = (dtConclusao, dtPrevisao) => {
        if (dtConclusao) {
            //o moment formata como será exibida a data
            return `Concluído em: ${moment(dtConclusao).format('DD/MM/yyyy')}`
        } else {
            return `Previsão de conclusão em: ${moment(dtPrevisao).format('DD/MM/yyyy')}`
        }
    };

    const verificaErros = () => {
        if (msgErro) {
            setErro(msgErro);
        }
    }

    
    // os elementos e classes mudam de acordo a se a tarefa está concluida ou não
    return (
        <div className={"container-item " + (dataConclusao ? "" : "ativo")} 
            onClick={() => dataConclusao ? null : () => {
                selecionarTarefa(tarefa)}}>
            <div>
                {dataConclusao && <img src= {concluido} alt="Tarefa concluida" /> }
            
                <p className={dataConclusao? "concluida" : ""}>{nome}</p>
                <span>{getDataTexto(dataConclusao, dataPrevistaConclusao)}</span>                
            </div>
            <div className="atualizar-deletar">
                    <button onClick={() => setShowModal(true)}>Deletar</button>
                    <Modal show={showModal} onHide={() => setShowModal(false)} className="container-modal">
                    <Modal.Body>
                        <p>Tem certeza que deseja excluir essa tarefa?</p>
                        {Erro && <span className='error'>{Erro}</span>}
                                     
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => {
                            verificaErros()
                            deletarTarefa(tarefa)
                        }}>Sim</button>
                       
                        <button onClick={() => {
                            setShowModal(false)
                            setErro('');
                            }}>Cancelar</button>
                    </Modal.Footer>
                </Modal>  

                    
            </div>

        </div>
    )
}