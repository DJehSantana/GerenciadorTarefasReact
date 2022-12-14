import React, { useState } from 'react';
import filtro from '../assets/icones/filtro.svg';

export const Filtros = props => {

    const {inicio, conclusao, status, setInicio, setConclusao, setStatus} = props

    //useState quando for true vai exibir os filtros no mobile
    //onclick - quando a img for clicada vai inverter o estado do showFilters
    //ou seja, quando o estado for false vai atribuir true e quando for true, false
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className='container-filtros'>
            <div className='title'>
                <span>Tarefas</span>
                <img src={filtro} alt= 'Filtro de tarefas' onClick={() => setShowFilters(!showFilters)} />

                <div className='form'> 
                    <div>
                        <label>Período de: </label>
                        <input type="date" value={inicio} onChange= {evento => setInicio(evento.target.value)}/>            
                    </div> 
                    <div> 
                        <label>até: </label>
                        <input type="date" value={conclusao} onChange= {evento => setConclusao(evento.target.value)} />
                    </div>           
                 
                    <div>
                        <label>Status:</label>
                        <select
                            value={status} onChange= {evento => setStatus(evento.target.value)}> 
                            <option value={0}>Todas</option>
                            <option value={1}>Pendentes</option>
                            <option value={2}>Concluídas</option>
                        </select> 
                    </div>           
                      

                </div>               
                
            </div>

            {showFilters === true && (
                <div className='filtros-mobile'> 
                    <div>
                        <label>Período de: </label>
                        <input type="date" value={inicio} onChange= {evento => setInicio(evento.target.value)} />            
                    </div> 
                    <div> 
                        <label>até: </label>
                        <input type="date" value={conclusao} onChange= {evento => setConclusao(evento.target.value)}/>
                    </div>           
                 
                    <div>
                        <label>Status:</label>
                        <select
                            value={status} onChange= {evento => setStatus(evento.target.value)}> 
                            <option value={0}>Todas</option>
                            <option value={1}>Pendentes</option>
                            <option value={2}>Concluídas</option>
                        </select> 
                    </div> 
                </div>
            )}
        </div>
    )
}