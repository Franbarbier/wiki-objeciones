import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './EditRtas.css';
// import { createObjecion, updateObjeciones } from '../../actions/objeciones';
import ModalContainer from '../ModalContainer/ModalContainer';
import { createRespuesta, deleteRespuestas, updateRespuestas } from '../../actions/respuestas';
import InfoRta from './InfoRta';



const EditRtas = ({ objecion, setAddRtaModal }) => {
    
  const dispatch = useDispatch()
  const respuestas = useSelector(state => state.respuestas.filter((rtass)=>rtass.objecion._id == objecion._id ))
  
  useEffect(()=>{
    setRtasDeObj(respuestas)
  }, [])
  
  const [idsDeleted, setIdsDeleted] = useState([])
  
  const [variaciones, setVariaciones] = useState([])
  
  
  const newRtaData = {
    nombre: '',
    rta: '',
    autor: '',
    variaciones : []
  }
  
  const [rtasDeObj, setRtasDeObj] = useState(respuestas)

  function handleEditRtas(index, type, value){
    
    const newState = rtasDeObj.map((obj, indexi) => {
      // 👇️ if id equals 2, update country property
      if (index === indexi) {
        return {...obj, [type]: value};
      }

      // 👇️ otherwise return object as is
      return obj;
    });
    
    setRtasDeObj(newState)

  }


  function handleCambios() {

    if (window.confirm("Desea guardar los cambios generados?") == true) {

      rtasDeObj.map( rta => {

        rta.objecion = objecion._id

        for (let index = 0; index < rta.variaciones.length; index++) {
          const element = rta.variaciones[index];
          if(element == ''){ rta.variaciones.splice(index,1); }
          
        }

        console.log(rta._id)
        if (!rta._id) {
          console.log('esta se deberia crear', rta)
          createRespuesta(rta, dispatch).then(
            (e)=> 
              console.log(e)      
            ).catch( (e) =>{
              console.log('error:::', e.error)
          } )
        } else {
          updateRespuestas(rta, dispatch).then(
            (e)=> 
              console.log(e)      
            ).catch( (e) =>{
              console.log('error:::', e.error)
          } )
        }

        if (idsDeleted.length > 0) {
          deleteRespuestas(idsDeleted, dispatch).then(
            (e)=> {
              console.log(e)
              setAddRtaModal(false)
            }).catch( (e) =>{
              console.log('error:::', e.error)
          } )
        }else{
          setAddRtaModal(false)
        }


        
      })
      
    }
  }



  useEffect(()=>{
    console.log(rtasDeObj)
  }, [rtasDeObj])




// Esto venia del otro componente
// const [estaRta, setEstaRta] = useState(rta)
// const [bigIndex, setBigIndex] = useState(index)
    
// useEffect(()=>{
//     setEstaRta(rta)
// }, [])


// function changeVariante(val, index) {

// let newTest = {...estaRta};
// newTest.variaciones[index] = val
// setEstaRta(newTest)

// }

// useEffect(()=>{
// let newRtasObj = [...rtasDeObj]
// newRtasObj[index] = estaRta
// setRtasDeObj(newRtasObj)
// },[estaRta])


  function render(){
      return  (
        <ModalContainer tipo="editRtas">
                <div id="EditRtas-view">
                    <div>
                      <div className='close-mod'>
                        <img onClick={ (e)=>{
                              e.stopPropagation()
                              setAddRtaModal(false)
                            }} src="/assets/close.png"/>
                      </div>
                     
                      <div>
                        <div id="objecion-data">
                            <span className="label-rtas">Objeción</span>
                            <h4>{objecion.objecion}</h4>
                        </div>
                        <div>
                          <span className="label-rtas">Respuestas</span>
                          {/* Map */}
                          {rtasDeObj.map((rta, index)=>(
                              <InfoRta rta={rta} index={index} setRtasDeObj={setRtasDeObj} rtasDeObj={rtasDeObj} idsDeleted={idsDeleted} setIdsDeleted={setIdsDeleted} />
                          ))}
                          {/* {rtasDeObj.map((rta, index)=>(
                               <div className='info-rta' key={"info-rta"+index}>
                                <div>
                                    <span>Nombre de la respuesta</span>
                                    <input className='nombre-rta' value={rta.nombre}  key={"info-rta-nombre"+index}/>
                                  </div>
                                </div>
                            ))} */}
                  
                  
                            <button
                              id="add-rta-btn"
                              onClick={ ()=>{ setRtasDeObj([...rtasDeObj, newRtaData]) } }
                            >Añadir respuesta</button>

                          </div>

                          <div>
                            <button id="guardar-cambios-btn" onClick={handleCambios}>Guardar cambios</button>
                            <button id="descartar-cambios-btn" onClick={()=>{setAddRtaModal(false)}}>Descartar cambios</button>
                          </div>
                      </div>

                    </div>
              </div>
        </ModalContainer>
              
            )

       }
       
       
       return ( render() )
}




export default EditRtas;