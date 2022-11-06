import axios from 'axios';
// axios - serve como cliente http para fazer requisições com promisses

const URL = process.env.REACT_APP_API_URL+'/api/'
console.log(URL);
const instance = axios.create ({
    baseURL: URL,
    timeout: 30000
    //o timeout especifica quanto tempo a aplicação vai aguardar o 
    //retorno das requisições
});

//função que será utilizada para executar qualquer requisição
export const executaRequisicao = (endPoint, metodo, body) => {

    //pega o token armazenado no localStorage
    const accessToken = localStorage.getItem('accessToken');

    //montando headers
    let headers = {'Content-Type' : 'application/json'};

    //verificando se tem token autorização
    if (accessToken) {
        //se tiver monta no header a authorization com o token
        headers['Authorization'] = 'Bearer ' + accessToken;
    }

    //printando parametros recebidos na chamada da função
    console.log(`Executando: ${URL}${endPoint}, metodo: ${metodo}, body: ${body}, headers ${headers}`);

    let payload = {
        url: endPoint,
        method: metodo,
        headers: headers
    }

    if(metodo !== 'delete') {
        payload = { data: body ? body : '', ...payload }
        
    }

    return instance.request(payload);
}
