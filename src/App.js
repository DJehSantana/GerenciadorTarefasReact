import {Routes, Route} from 'react-router-dom';
import './styles/app.scss';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { useState } from 'react';

function App() {
  
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  
  //configurando as rotas:
  //se o usuário não tiver o token de acesso no localStorage, qualquer rota que for digitada 
  //vai levar o usuário para a tela de login
  //caso o usuário já estiver logado (tiver o token de acesso), a aplicação já vai abrir na Homepage
  return (
    <Routes>
      {!accessToken ?
        <Route path='*' element=
          {<Login setAccessToken={setAccessToken}/>}>          
        </Route>
         
      : 
        <Route path='*' element=
          {<Home setAccessToken={setAccessToken} />}>
        </Route>}   
      
    </Routes>
  );
}

export default App;
