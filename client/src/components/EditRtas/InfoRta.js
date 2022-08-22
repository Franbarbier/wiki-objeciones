import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import { createRespuesta, deleteRespuestas, updateRespuestas } from '../../actions/respuestas';



const InfoRta = ({ rta, index }) => {

    const [estaRta, setEstaRta] = useState(rta)

    useEffect(()=>{
        console.log(estaRta)
    }, [])

 function render(){
      return  (
        <div>
            <input value={estaRta.nombre}/>
            <input value={estaRta.rta}/>
           
           
                {rta.variaciones.map((variante, index)=>(
                    <>
                        <br />
                        <label>Hola {index}</label>
                        <input value={variante} />
                    </>
                ))}
                
                
            <br />
            <br />
        </div>
      )

       }
       
       return ( render() )
}




export default InfoRta;