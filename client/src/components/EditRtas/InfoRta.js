import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import { createRespuesta, deleteRespuestas, updateRespuestas } from '../../actions/respuestas';



const InfoRta = ({ rta, index, setRtasDeObj, rtasDeObj, setIdsDeleted, idsDeleted }) => {

    const [estaRta, setEstaRta] = useState(rta)
        
    useEffect(()=>{
        console.log(estaRta)
    })
   

function changeVariante(val, index) {
    
    let newTest = {...estaRta};
    newTest.variaciones[index] = val
    setEstaRta(newTest)

}

useEffect(()=>{
    let newRtasObj = [...rtasDeObj]
    newRtasObj[index] = estaRta
    setRtasDeObj(newRtasObj)
},[estaRta])


 function render(){
      return  (
        <div className='info-rta'>
             <div>
                <span>Nombre de la respuesta</span>
                <input onChange={(e)=>{ setEstaRta( {...estaRta, nombre: e.target.value} ) }} className='nombre-rta' value={estaRta.nombre}/>
              </div>


              <div>
              <span>Respuesta</span>
                <textarea onChange={(e)=>{ setEstaRta({...estaRta, rta: e.target.value}) }} value={estaRta.rta} className='contenido-rta'></textarea>

                <div
                   className='agregar-variante'
                   onClick={ ()=>{
                       let newRta = {...estaRta}
                       newRta.variaciones.push('')
                       setEstaRta(newRta)
                    } }
                >
                  <p>+</p>
                  
                </div>
              
            
                    {estaRta.variaciones.length > 0 && <span className='variac-tit'>Variantes</span> }
                    {estaRta.variaciones.map((variante, index)=>(
                        <div key={"variacion-cont"+index} className='campo-variaciones'>                        
                            <textarea value={variante}
                            onChange={(e)=>{ changeVariante(e.target.value, index) }}
                            key={'variante'+index}
                            />
                            <img
                                className='close-variac'
                                onClick={()=>{
                                    let newRta = {...estaRta}
                                    newRta.variaciones.splice(index,1);
                                    setEstaRta(newRta)
                                }}
                                src="./assets/close.png"
                            />
                        </div>
                    ))}
           
                </div>
                
                        <div className="delete-rta"
                                onClick={()=>{
                                setRtasDeObj( rtasDeObj.filter((rtass)=>rtass != rta ) )
                                if (rta._id) {
                                    setIdsDeleted( [...idsDeleted, rta._id] )
                                }
                                }}
                            >
                                <img src="/assets/trash.svg"/>
                            </div>
                    
                
            {/* <br />
            <br /> */}
        </div>
      )

       }
       
       return ( render() )
}




export default InfoRta;