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



const EditRtas = ({ objecion, setAddRtaModal, rta, setRtaData }) => {
    
  const dispatch = useDispatch()
   
  const [idsDeleted, setIdsDeleted] = useState([])
  
  const [variaciones, setVariaciones] = useState([])  
  const [modoDelete, setModoDelete] = useState(false)
  
  const newRtaData = {
    nombre: '',
    rta: '',
    autor: '',
    variaciones : [ ]
  }
  console.log(objecion)
  
  const [rtasDeObj, setRtasDeObj] = useState([rta])

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

        if (!rta._id) {

          createRespuesta(rta, dispatch, objecion).then(
            (e)=>
              alert("Respuesta creada con éxito.")
            ).catch( (e) =>{
              console.log('error:::', e.error)
          } )
        } else {
          updateRespuestas(rta, dispatch, objecion).then(
            (e)=> 
              console.log(e)      
            ).catch( (e) =>{
              console.log('error:::', e.error)
          } )
        }

      })       
        
        
      if (idsDeleted.length > 0) {
        console.log(idsDeleted)
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
      
    }
  }



  useEffect(()=>{
    console.log(rtasDeObj)
  }, [rtasDeObj])
  

  function render(){
      return  (
        <ModalContainer tipo="editRtas" closeModal={()=>{setAddRtaModal(false)}}>
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
                          {/* <span className="label-rtas">Respuestas</span> */}
                          {/* Map */}
                          {rtasDeObj.map((rta, index)=>(
                              <InfoRta setModoDelete={setModoDelete} rta={rta} index={index} setRtasDeObj={setRtasDeObj} rtasDeObj={rtasDeObj} idsDeleted={idsDeleted} setIdsDeleted={setIdsDeleted} />
                          ))}
                          
                          </div>
                          {modoDelete &&
                            <div>
                              <strong>Se eliminará la siguiente respuesta:</strong>
                              <br />
                              <i style={{'color':'#747474'}}>{modoDelete}</i>
                              <br />
                              <br />
                              <p>Desea continuar?</p>
                              <br />
                            </div>
                          }

                          <div>
                            
                            <button id="guardar-cambios-btn" onClick={handleCambios}>Guardar cambios</button>
                            <button id="descartar-cambios-btn" onClick={()=>{
                                if (window.confirm("Estas a punto de Descartar los Cambios de Esta Respuesta ¿Quieres Continuar?")) {
                                  setAddRtaModal(false)
                                  setRtaData(false)
                                }
                              }}>Descartar cambios</button>
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