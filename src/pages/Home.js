import React from 'react';
import { useEffect, useState } from 'react';
import {Modal} from 'react-bootstrap';
//importando componentes da Home
import { Filtros } from '../componentes/Filtros';
import { Footer } from '../componentes/Footer';
import { Header } from '../componentes/Header';
import { Listagem } from '../componentes/Listagem';
import { executaRequisicao } from '../services/api';

import imgSave from '../assets/icones/icon-save.png';
import imgCancel from '../assets/icones/icon-cancel.svg';

export const Home = props => {

    //Sates dos filtros das tarefas
    const [tarefas, setTarefas] = useState([]); 
    const [inicio, setInicio] = useState('');
    const [conclusao, setConclusao] = useState('');
    const [status, setStatus] = useState(0);

    //States dos modais
    const [showModal, setShowModal] = useState(false);
    const [nomeTarefa, setNomeTarefa] = useState('');
    const [dataPrevistaConclusao, setDataPrevistaConclusao] = useState('');
    const [msgErro, setMsgErro] = useState('');
    
    //função para alterar State do modal
    const toggleModal = () => {
        setShowModal(!showModal);
    }
    
    //conectando com a API de tarefas
    const getTarefasComFiltro = async () => {
        try {

            //filtros inicia recebendo o status 
            let filtros = '?status='+status;

            //se tiver parâmetros de filtragem para data de início e conclusão, adiciona nos filtros
            if (inicio) {
                filtros += '&inicio='+inicio;
            }

            if (conclusao) {
                filtros += '&conclusao='+conclusao
            }
           
            //buscando filtro de tarefas rota: tarefa, mátodo: get
            const resultado = await executaRequisicao ('tarefa'+filtros, 'get');

            if (resultado && resultado.data) {
                setTarefas(resultado.data);
            }
        } catch (e) {
            console.log('erro: ' + e);
        }
    }

    //chamando o método getTarefas no carregamento
    useEffect(() => {
        getTarefasComFiltro
    }, [status, inicio, conclusao]);

    //função para chamar método cadastrar da tarefa na API
    const salvarTarefa = async () => {

        try {
            //tratamento de erro
            if(!nomeTarefa || !dataPrevistaConclusao ) {
                setMsgErro('Favor informar corretamente nome e data');
                return
            }
            //atribuindo valor dos inputs as propriedades do body que será enviado 
            //como parâmetro para cadastro da tarefa
            const body = {
                nome : nomeTarefa,
                dataPrevistaConclusao : dataPrevistaConclusao
            }

            //caso dados sejam preenchidos corretamente executa requisição de cadastro da tarefa
            await executaRequisicao('tarefa', 'post', body);
            
            //limpando campos e fechando o modal
            setNomeTarefa('');
            setDataPrevistaConclusao('');
            setMsgErro('');
            setShowModal(false);

            //chamando filtro de tarefas
            await getTarefasComFiltro();
            
        } catch (e) {
            console.log(e);
            if(e?.response?.data?.erro) {
                setMsgErro(e.response.data.erro);
            } else {
                setMsgErro('Não foi possível cadastrar a tarefa, fale com o administrador');
            }
        }
    }

    const sair = () => {
         //limpando localStorage para fazer o logout
         localStorage.removeItem('accessToken');
         localStorage.removeItem('usuarioNome');
         localStorage.removeItem('usuarioEmail');
         props.setAccessToken('');
    }
    //a função sair será enviada como props para o componente header

    return(
        <>            
            <Header sair= {sair}
                showModal={() => setShowModal(true)}/>  
            <Filtros 
                inicio= {inicio}
                conclusao= {conclusao}
                status= {status}
                setInicio= {setInicio}
                setConclusao= {setConclusao}
                setStatus= {setStatus}
                />  
            <Listagem tarefas= {tarefas} getTarefasComFiltro= {getTarefasComFiltro} />
            <Footer showModal={() => setShowModal(true)}/> 
            <Modal show={showModal} onHide={toggleModal} className="container-modal">
                <Modal.Body>
                    <p>Adicionar uma tarefa</p>
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
                    </div>                    
                </Modal.Body>
                <Modal.Footer>
                    <div className='modal-icons'>                    
                        <button onClick={salvarTarefa}><img src={imgSave} alt="Salvar tarefa"/></button>
                        <button onClick={() => {
                            setShowModal(false)
                            setMsgErro('')
                            setNomeTarefa('')
                            setDataPrevistaConclusao('')
                        }}> <img src={imgCancel} alt= "Cancelar alterações" /></button>
                    </div>
                </Modal.Footer>
            </Modal>       
        </>
    );
}