import React, { useState } from 'react';
import {Modal} from 'react-bootstrap';
import logo from '../assets/icones/Logo.svg';
import mail from '../assets/icones/mail.svg';
import lock from '../assets/icones/lock.svg';
import { Input } from '../componentes/Input';
import { executaRequisicao } from '../services/api';

export const Login = props => {
    //[variável -- função que altera o estado do componente]
    const [login, setLogin] = useState ('');
    const [senha, setSenha] = useState ('');
    const [msgErro, setMsgErro] = useState('');
    const [isLoading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    //o React guarda a informação a cada alteração, a variável armazena a informação
    //para testar se o login e senha estão sendo armazenados corretamente:
    //console.log(`login: ${login}, senha: {senha}`);
   
    const executaLogin = async evento => {

        try {
            evento.preventDefault();
            setLoading(true);
            setMsgErro('');
    
            //criando o body do login que será passado na requisição, com o login e senha digitados pelo 
            //usuário, que foram armazenados nas variáveis
            const body = {login, senha}
            
            //chamando função para executar a requisição
            const resultado = await executaRequisicao('login', 'post', body);
            //caso a requisição de login seja executada com sucesso, vai verificar se 
            //o resultado tem o token jwt na data(corpo) e vai armazenar o token, o nome e o email do usuario no localStorage do navegador
            if(resultado?.data?.token) {                
                localStorage.setItem('accessToken', resultado.data.token);
                localStorage.setItem('usuarioNome', resultado.data.nome);
                localStorage.setItem('usuarioEmail',resultado.data.email);
                props.setAccessToken(resultado.data.token);
            } 
                        
        } catch (e) {
            //verificando se o e tem response data e erro
            if(e?.response?.data?.erro) {
                //atribuindo erro a mensagem de erro
                setMsgErro(e.response.data.erro);
            } else {
                setMsgErro('500 - Não foi possível realizar o login!')
            }
            console.log(e);            
        }

        setLoading(false);    
    }

    return (
        <div className='container-login'>
            <img
                src= {logo}
                alt= "Logo Devaria"
                className= 'logo'
            />

            <form>
               <Input 
                 srcImg = {mail} 
                 altImg = "Icone email" 
                 inputType = "text" 
                 inputName = "login" 
                 inputPlaceholder = "Informe seu email" 
                 value = {login} 
                 setValue = {setLogin}
                 />

                <Input 
                 srcImg = {lock} 
                 altImg = "Icone senha" 
                 inputType = "password" 
                 inputName = "senha" 
                 inputPlaceholder = "Informe sua senha" 
                 value = {senha} 
                 setValue = {setSenha}
                 />

                {msgErro && <p className='error'>{msgErro}</p>}
                
                {//quando o usuário clicar no botão entrar, ele vai desabilitar o clique por 3 segundos e vai 
                //colocar a mensagem de carregando no botão
                }
                <button onClick={executaLogin} disabled= {isLoading}>{isLoading === true ? '...Carregando' : 'Entrar'}</button>
            </form>

            <Modal show={showModal} onHide={() => setShowModal(false)} className="container-modal">
                <Modal.Body>
                    <p>Este modal será usado para cadastro de novos usuários</p>                    

                </Modal.Body>                
            </Modal>
        </div>
    );
}