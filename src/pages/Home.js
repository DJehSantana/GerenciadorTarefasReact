import React from 'react';
import { Filtros } from '../componentes/Filtros';
import { Header } from '../componentes/Header';

export const Home = props => {

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
        </>
    );
}