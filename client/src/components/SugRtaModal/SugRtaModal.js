import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './SugRtaModal.css';
// import { createObjecion, updateObjeciones } from '../../actions/objeciones';
import ModalContainer from '../ModalContainer/ModalContainer';
import { createSugerencia } from '../../actions/sugerencias';




const SugRtaModal = ({ objecion, setAddRtaModal }) => {
    
  const [rtaSugerida, setRtaSugerida] = useState({
    nombre: '',
    rta: '',
    autor: '',
    variaciones : [ ]
  })

  const dispatch = useDispatch()

  useEffect(()=>{
    console.log(rtaSugerida)
  })

  function sendSuge(){
    
    setRtaSugerida({
      nombre: '',
      rta: '',
      autor: '',
      variaciones : [ ]
    })


    
    createSugerencia({
      objecionId: objecion._id,
      rtas: [rtaSugerida],
      type: 1
    }, dispatch).then(
      (e)=> 
        console.log(e),
        alert("Gracias por sugerir una respuesta! La vamos a ver cuanto antes.")
        // setAddRtaModal(false)
      ).catch( (e) =>{
        console.log('error:::', e.error)
        alert('Hubo un error, por favor intentalo de nuevo.')
    } )
  }


  function render(){
      return  (
        <ModalContainer tipo="sugRta">
                <div id="SugRta-view">
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
                          
                              {/* <BigRtaCont key={"BigRtaCont"+0} rta={rta} bigIndex={0} handleEditRtas={handleEditRtas} rtasDeObj={rtasDeObj} setRtasDeObj={setRtasDeObj} setIdsDeleted={setIdsDeleted} idsDeleted={idsDeleted} setVariaciones={setVariaciones} variaciones={variaciones} handleEditVariaciones={handleEditVariaciones}/> */}
                              <div className='info-rta' id={"info-rta-sug"} >
                                  <div id={"nombre-cont-sug"}>
                                    <span>Nombre de la respuesta</span>
                                    <input id={"nombre-rta-sug"} onChange={ (e)=>{ setRtaSugerida({...rtaSugerida, nombre : e.target.value}) } } className='nombre-rta'  value={rtaSugerida.nombre}/>
                                  </div>
                                  
                                  <div id={"respuesta-cont-sug"}>
                                    <span>Respuesta</span>
                                    <textarea id={"contenido-rta-sug"} onChange={ (e)=>{ setRtaSugerida({...rtaSugerida, rta : e.target.value}) } } className='contenido-rta' rows="3" value={rtaSugerida.rta}
                                    
                                    ></textarea>
                                    
                                    
                                  
                                  </div>
                                  
                              </div>
                            

                          </div>

                          <div>
                            <button id="guardar-cambios-btn" onClick={()=>{ sendSuge() } }>Enviar sugerencia</button>
                            <button id="descartar-cambios-btn" onClick={()=>{setAddRtaModal(false)}}>Descartar</button>
                          </div>
                      </div>

                    </div>
              </div>
        </ModalContainer>
              
            )

       }
       
       
       return ( render() )
}




export default SugRtaModal;