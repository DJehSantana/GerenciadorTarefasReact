import React, { useEffect, useState } from 'react';
import {Modal} from 'react-bootstrap';
//importando componentes da Home
import { Filtros } from '../componentes/Filtros';
import { Footer } from '../componentes/Footer';
import { Header } from '../componentes/Header';
import { Listagem } from '../componentes/Listagem';
import { executaRequisicao } from '../services/api';

export const Home = props => {

    //Sates dos filtros das tarefas
    const [tarefas, setTarefas] = useState([]); 
    const [inicio, setInicio] = useState('');
    const [conclusao, setConclusao] = useState('');
    const [status, setStatus] = useState(0);

    //States dos modais
    const [showModal, setShowModal] = useState(false);
    
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
        getTarefasComFiltro()
    }, [status, inicio, conclusao]);

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
            <Header sair= {sair}/>  
            <Filtros 
                inicio= {inicio}
                conclusao= {conclusao}
                status= {status}
                setInicio= {setInicio}
                setConclusao= {setConclusao}
                setStatus= {setStatus}
                />  
            <Listagem tarefas= {tarefas} />
            <Footer showModal={() => setShowModal(true)}/> 
            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Body>
                    <p>Adicionar uma tarefa</p>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>       
        </>
    );
}