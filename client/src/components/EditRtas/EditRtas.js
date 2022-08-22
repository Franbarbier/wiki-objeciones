import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './EditRtas.css';
// import { createObjecion, updateObjeciones } from '../../actions/objeciones';
import ModalContainer from '../ModalContainer/ModalContainer';
import { createRespuesta, deleteRespuestas, updateRespuestas } from '../../actions/respuestas';







const CampoVariaciones = ({ bigIndex, rta, setRtasDeObj, rtasDeObj}) => {


  
    return  (
        <div key={'variante-cont'+bigIndex}>
          {rta.variaciones.map((varia, index)=>(
            <div className='campo-variaciones'
                  key={Math.floor(Math.random() * (90000 - 0) ) + 0 + index}
                  id={Math.floor(Math.random() * (90000 - 0) ) + 0 + index}
              >
               <textarea
                onChange={(e)=>{
                  let oldRtas = [...rtasDeObj]
                  oldRtas[bigIndex].variaciones[index] = e.target.value;

                  setRtasDeObj(oldRtas)
                }}
                key={'variante'+index+bigIndex}
                id={'variante'+index+bigIndex}
                value={varia} 
              />
              <img
                className='close-variac'
                onClick={()=>{
                  let oldRtas = [...rtasDeObj]
                  oldRtas[bigIndex].variaciones.splice(index,1);
                  setRtasDeObj(oldRtas)
                }}
                src="./assets/close.png"
              />
            </div>
          ))
          }
      
        </div>
    )
  
}


const BigRtaCont = ({rta, bigIndex, handleEditRtas, rtasDeObj, setRtasDeObj, setIdsDeleted, idsDeleted, setVariaciones, variaciones, handleEditVariaciones }) => {
  return(

          <div className='info-rta' id={"info-rta"+bigIndex} key={'info-rta'+bigIndex} >
              <div key={bigIndex+6} id={"nombre-cont"+bigIndex}>
                <span>Nombre de la respuesta</span>
                <input id={"nombre-rta"+bigIndex} key={bigIndex + 0} onChange={ (e)=>{ handleEditRtas(bigIndex, 'nombre', e.target.value) } } className='nombre-rta'  value={rta.nombre}/>
              </div>
              
              <div key={bigIndex+7} id={"respuesta-cont"+bigIndex}>
                <span>Respuesta</span>
                <textarea id={"contenido-rta"+bigIndex} onChange={ (e)=>{ handleEditRtas(bigIndex, 'rta', e.target.value) } } className='contenido-rta' rows="3" value={rta.rta}
                key={"textarea-rta"+bigIndex}
                ></textarea>
                <div
                   className='agregar-variante'
                   onClick={ ()=>{
                    let newVars = [...variaciones]
                    newVars.push({
                      bigIndex : bigIndex,
                      variacion : '' 
                    })
                    setVariaciones(newVars)

                  } }
                >
                  <p>+</p>
                  
                </div>
                {rta.variaciones.length > 0 && <span className='variac-tit'>Variantes</span> }
                
                <div key={'cont-componenteVariaciones'+bigIndex}>
                  <div key={'variante-cont'+bigIndex}>

                      {rta.variaciones.map((varia, index)=>(
                        <div className='campo-variaciones'
                              key={Math.floor(Math.random() * (90000 - 0) ) + 0 + index}
                              id={Math.floor(Math.random() * (90000 - 0) ) + 0 + index}
                          >
                          <textarea
                            onChange={(e)=>{
                              // let oldRtas = [...rtasDeObj]
                              // oldRtas[bigIndex].variaciones[index] = e.target.value;

                              // setRtasDeObj(oldRtas)
                              handleEditVariaciones( bigIndex, index, e.target.value)


                            }}
                            key={'variante'+index+bigIndex}
                            id={'variante'+index+bigIndex}
                            value={varia} 
                          />
                          <img
                            className='close-variac'
                            onClick={()=>{
                              let oldRtas = [...rtasDeObj]
                              oldRtas[bigIndex].variaciones.splice(index,1);
                              setRtasDeObj(oldRtas)
                            }}
                            src="./assets/close.png"
                          />
                        </div>
                      ))
                      }
                  
                  </div>
                  

                </div>
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
          </div>
  )
        
}

const EditRtas = ({ objecion, setAddRtaModal }) => {
    
  const dispatch = useDispatch()
  const respuestas = useSelector(state => state.respuestas.filter((rtass)=>rtass.objecion._id == objecion._id ))

  const [rtasDeObj, setRtasDeObj] = useState(respuestas)
  const [idsDeleted, setIdsDeleted] = useState([])

  const [variaciones, setVariaciones] = useState([])

  
  const newRtaData = {
    nombre: '',
    rta: '',
    variaciones : []
  }

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

  function handleEditVariaciones( indexX, index, value){
    
    const newState = rtasDeObj[indexX].variaciones.map((variacion, indexi) => {
      // 👇️ if id equals 2, update country property
      if (index === indexi) {
        variacion = value  
        return variacion;
      }

      // 👇️ otherwise return object as is
      return variacion;
    });
    
    // console.log(newState)
    setRtasDeObj(newState)

  }


  function handleCambios() {

      rtasDeObj.map( rta => {

        rta.objecion = objecion._id

        for (let index = 0; index < rta.variaciones.length; index++) {
          const element = rta.variaciones[index];
          if(element == ''){ rta.variaciones.splice(index,1); }
          
        }

        console.log(rta)
        if (!rta._id) {
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
            (e)=> 
              console.log(e)      
            ).catch( (e) =>{
              console.log('error:::', e.error)
          } )
        }



      })

  }



  useEffect(()=>{
    console.log(variaciones)
    console.log(rtasDeObj)
  })







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
                              <BigRtaCont key={"BigRtaCont"+index} rta={rta} bigIndex={index} handleEditRtas={handleEditRtas} rtasDeObj={rtasDeObj} setRtasDeObj={setRtasDeObj} setIdsDeleted={setIdsDeleted} idsDeleted={idsDeleted} setVariaciones={setVariaciones} variaciones={variaciones} handleEditVariaciones={handleEditVariaciones}/>
                          ))}
                          
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