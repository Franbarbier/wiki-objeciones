import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import { createRespuesta, deleteRespuestas, updateRespuestas } from '../../actions/respuestas';




const InfoRta = ({ rta, index, setRtasDeObj, rtasDeObj, setIdsDeleted, idsDeleted,setModoDelete }) => {

    const [estaRta, setEstaRta] = useState(rta)
    const [bigIndex, setBigIndex] = useState(index)
        
    useEffect(()=>{
        setEstaRta(rta)
    }, [])
   
    console.log(rta)

function changeVariante(val, index) {
    
    let newTest = {...rta};
    newTest.variaciones[index] = val
    setEstaRta(newTest)

}

useEffect(()=>{
    let newRtasObj = [...rtasDeObj]
    newRtasObj[index] = rta
    setRtasDeObj(newRtasObj)
    
},[estaRta])


 function render(){
      return  (
        <div className='info-rta' key={"info-rta"+index}>
             <div>
                <span>Nombre de la respuesta</span>
                <input onChange={(e)=>{ 
                    let newRta = [...rtasDeObj];
                    newRta[index].nombre = e.target.value
                    setRtasDeObj(newRta)
                    }} className='nombre-rta' value={rta.nombre}  key={"info-rta-nombre"+index}/>
              </div>


              <div>
              <span>Respuesta</span>

                <textarea onChange={(e)=>{ 
                     let newRta = [...rtasDeObj];
                     newRta[index].rta = e.target.value
                     setRtasDeObj(newRta)
                 }} value={rta.rta} className='contenido-rta' key={"info-rta-rta"+index}></textarea>

                <div
                   className='agregar-variante'
                   onClick={ ()=>{
                       let newRta = {...rta}
                       newRta.variaciones.push('')
                       setEstaRta(newRta)
                    } }
                >
                  <p>+</p>
                  
                </div>
                          
                    {rta.variaciones.length > 0 && <span className='variac-tit'>Variantes</span> }

                    {rta.variaciones.map((variante, index)=>(
                        <div key={"variacion-cont"+bigIndex+index} className='campo-variaciones'>                        
                            <textarea value={variante}
                            onChange={(e)=>{ changeVariante(e.target.value, index) }}
                            key={'variante'+index}
                            />
                            <img
                                className='close-variac'
                                onClick={()=>{

                                    let newRta = [...rtasDeObj];
                                    newRta[index].variaciones.splice(index,1);
                                    setEstaRta(newRta)
                                }}
                                src="./assets/close.png"
                            />
                        </div>
                    ))}
           
                </div>
                <div>
                    <span>Autor</span>
                    <input className='inputs-rta' onChange={(e)=>{ 
                         let newRta = [...rtasDeObj];
                         newRta[index].autor = e.target.value
                         setRtasDeObj(newRta)
                     }} value={rta.autor} key={"info-rta-rta"+index}/>
                </div>
                
                <div className="delete-rta"
                        onClick={()=>{
                            let newRtasDeObj = [...rtasDeObj]
                            newRtasDeObj.splice(index,1);
                            setModoDelete(rta.rta)
                            setRtasDeObj( newRtasDeObj)
                            if (rta._id) {
                                setIdsDeleted( [...idsDeleted, rta._id] )
                            }
                        }}
                    >
                        <img src="/assets/trash.svg"/>
                    </div>
                    
        </div>
      )

       }
       
       return ( render() )
}




export default InfoRta;