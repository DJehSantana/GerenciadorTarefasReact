import React from 'react';
//importando componentes da Home
import { Filtros } from '../componentes/Filtros';
import { Footer } from '../componentes/Footer';
import { Header } from '../componentes/Header';
import { Listagem } from '../componentes/Listagem';

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
            <Listagem />
            <Footer />        
        </>
    );
}