import React from 'react';

export const Input = props => {
    
    const {
        srcImg, 
        altImg, 
        inputType, 
        inputName, 
        inputPlaceholder, 
        value, 
        setValue
    } = props;
    
    // retornando o componente com as propriedades passadas por parâmetro
    return (  
        <div className='input'>
            <img src= {srcImg} alt= {altImg} />
            <input type= {inputType} name= {inputName} placeholder= {inputPlaceholder}
                value={value} onChange= {evento => setValue(evento.target.value)}/>
                {//evento - alteração = quando o input mudar ele vai pegar o value do input e alterar no login (setLogin)
                }
        </div>
    );
    
}