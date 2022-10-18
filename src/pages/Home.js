import React from 'react';

export const Home = props => {
    return(
        <>
            <h1>Gerenciador de Tarefas - Home</h1>
            <a onClick={e => {
                //limpando localStorage para fazer o logout
                localStorage.removeItem('accessToken');
                localStorage.removeItem('usuarioNome');
                localStorage.removeItem('usuarioEmail');
                props.setAccessToken('');
            }}>Sair</a>
        </>
    )
}