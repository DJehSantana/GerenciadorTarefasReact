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
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [emailUsuario, setEmailUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');

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


    const cadastrarUsuario = async () => {

        try {
            //tratamento de erro
            if(!nomeUsuario || !emailUsuario || !senhaUsuario ) {
                setMsgErro('Favor preencher corretamente todos os campos');
                return
            }
            //atribuindo valor dos inputs as propriedades do body que será enviado 
            //como parâmetro para cadastro da tarefa
            const body = {
                nome : nomeUsuario,
                email : emailUsuario,
                senha : senhaUsuario
            }

            //caso dados sejam preenchidos corretamente executa requisição de cadastro da tarefa
            await executaRequisicao('usuario', 'post', body);
            
            //limpando campos e fechando o modal
            setNomeUsuario('');
            setEmailUsuario('');
            setSenhaUsuario('');
            setMsgErro('');
            setShowModal(false);
            
        } catch (e) {
            console.log(e);
            if(e?.response?.data?.erro) {
                setMsgErro(e.response.data.erro);
            } else {
                setMsgErro('Não foi possível finalizar o cadastro, fale com o administrador');
            }
        }
    }


    return (
        <div className='container-login'>
            <img
                src= {logo}
                alt= "Logo Devaria"
                className= 'logo'
            />

            <form>

                {msgErro && <span className='error'>{msgErro}</span>}

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

                
                <p onClick={() => {setShowModal(true)}}>Cadastre-se</p>
                
                {//quando o usuário clicar no botão entrar, ele vai desabilitar o clique por 3 segundos e vai 
                //colocar a mensagem de carregando no botão
                }
                <button onClick={executaLogin} disabled= {isLoading}>{isLoading === true ? '...Carregando' : 'Entrar'}</button>
            </form>

            <Modal show={showModal} onHide={() => setShowModal(false)} className="container-modal">
                <Modal.Body>
                    <p>Cadastre seus dados!</p>
                    {msgErro && <span className='error'>{msgErro}</span>} 

                    <div className="inputs col-12">
                        <input type="text" name="nome"
                            placeholder="Nome Completo" value={nomeUsuario}
                            onChange={evento => setNomeUsuario(evento.target.value)} />
                        <input type="text" name="email"
                            placeholder="Email" value={emailUsuario}
                            onChange={evento => setEmailUsuario(evento.target.value)} />
                        <input type="password" name="senhaUsuario"
                            placeholder="Senha" value={senhaUsuario}
                            onChange={evento => setSenhaUsuario(evento.target.value)} />
                    </div>                   

                </Modal.Body> 

                <Modal.Footer>
                    <div className='footer-usuario'>                    
                        <button onClick={cadastrarUsuario}>Salvar</button>
                        <button onClick={() => {
                            setShowModal(false)
                            setMsgErro('')
                            setNomeUsuario('')
                            setEmailUsuario('')
                            setSenhaUsuario('')
                        }}>Cancelar</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}