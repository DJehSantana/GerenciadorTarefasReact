import axios from 'axios';
// axios - serve como cliente http para fazer requisições com promisses

const URL = process.env.REACT_APP_API_URL+'/api/'
const instance = axios.create ({
    baseUrl: URL,
    timeout: 30000
    //o timeout especifica quanto tempo a aplicação vai aguardar o 
    //retorno das requisições
});

//função que será utilizada para executar qualquer requisição
export const executaRequisicao = (endPoint, metodo, body) => {
    //printando parametros recebidos na chamada da função
    console.log(`Executando: ${URL}${endPoint}, metodo: ${metodo}, body: ${body}`);

    return instance.request({
        url: endPoint,
        method: metodo,
        data: body? body : ''
    });
}