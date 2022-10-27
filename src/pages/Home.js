import React, { useEffect, useState } from 'react';
//importando componentes da Home
import { Filtros } from '../componentes/Filtros';
import { Footer } from '../componentes/Footer';
import { Header } from '../componentes/Header';
import { Listagem } from '../componentes/Listagem';
import { executaRequisicao } from '../services/api';

export const Home = props => {

    
    const [tarefas, setTarefas] = useState([]); 
    
    //conectando com a API de tarefas
    const getTarefasComFiltro = async () => {
        try {
            //buscando filtro de tarefas rota: tarefa, mátodo: get
            const resultado = await executaRequisicao ('tarefa', 'get');

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
    }, []);

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
            <Filtros />  
            <Listagem tarefas= {tarefas} />
            <Footer />        
        </>
    );
}