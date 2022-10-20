import React, { useState } from 'react';
//importando componentes da Home
import { Filtros } from '../componentes/Filtros';
import { Footer } from '../componentes/Footer';
import { Header } from '../componentes/Header';
import { Listagem } from '../componentes/Listagem';

export const Home = props => {

    
    const [tarefas, setTarefas] = useState([
        {
            id: '632d8bb8e8e11f5cabc4b005',
            nome: 'Tarefa Teste',
            dataPrevistaConclusao: '2022-10-15T00:00:00.000Z',
            dataConclusao: '2022-10-05'            
        },
        {
            id: '632d8c57e8e11f5cabc4b00a',
            nome: 'concluida',
            dataPrevistaConclusao: 'Date(2022-09-29',
            dataConclusao: null,
        }
    ]);    


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