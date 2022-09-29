import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './ModalNewObj.css';
import { createSugerencia } from '../../actions/sugerencias';
import ModalContainer from '../ModalContainer/ModalContainer';




const AddRta = ({ setNewRta, index, rtaa, newRta }) => {
 
function handleNewRta(e){
  let copyRtas = [...newRta]
  copyRtas[index].rta = e.target.value
  setNewRta(copyRtas) 
}

function handleNewRtaName(e){
  let copyRtas = [...newRta]
  copyRtas[index].nombre = e.target.value
  setNewRta(copyRtas) 
}

function render(){

    return  <div id="add-rta">
              <div>
                  <label>RESPUESTA {index + 1}</label>
                  <input onChange={ (e)=>{handleNewRtaName(e)} } placeholder="Nombre de la respuesta" />
                  <br />
                  <br />
                  <textarea onChange={ (e)=>{handleNewRta(e)} } placeholder="Sugerir respuesta"></textarea>
                  <div className='deleteRta'
                  onClick={()=>{ 
                    setNewRta(newRta.filter( rtita=> newRta[index] != rtita ))
                  }}
                  >
                    <img src="/assets/close.png"/>
                  </div>
              </div>             
            </div>

     }
     
     
     return ( render() )
}



const ModalNewObj = ({ setModalNewObj }) => {
    

  const dispatch = useDispatch()

  const [newObj, setNewObj] = useState('')
  const [newRta, setNewRta] = useState([{}])

    useEffect(()=>{
     
    })

  function handleSendSugerencia(e) {
    

    setNewObj('')
    setNewRta([{}])
    setModalNewObj(false)

    
    createSugerencia({
      objecion : newObj,
      rtas : newRta,
      type : 0
    }, dispatch).then(
      (e)=> 
        console.log(e),
        alert('Gracias! La evaluaremos cuánto antes.')

      ).catch( (e) =>{
        console.log('error:::', e.error)
        alert('Hubo un error, por favor intentalo de nuevo.')
    } )

  }


  function render(){
      return  (

        <ModalContainer tipo="newObj" closeModal={ ()=>{ setModalNewObj(false) } }>
            <div id="ModalNewObj-view">
                <div onClick={(e)=>{e.stopPropagation()}}>
                    <div>
                        <h3>Envianos una nueva objeción para que la agreguemos</h3>
                        <label>OBJECION</label>
                        <textarea onChange={ (e)=>{ setNewObj(e.target.value) } } rows="5" placeholder="Escribir objeción" value={newObj}>
                        </textarea>
                        { newRta.map((rtaa, index)=>(
                          <AddRta setNewRta={setNewRta} newRta={newRta} rtaa={rtaa} index={index} />
                        )) }
                        
                        
                         <button id="new-rta" onClick={ ()=>{
                                    setNewRta([...newRta, ''])
                                    setTimeout(() => {
                                      document.querySelector('#ModalNewObj-view>div').scroll({ top: document.querySelector('#ModalNewObj-view>div').scrollHeight, behavior: 'smooth' });
                                    }, 200);
                          } }>Sugerir nueva respuesta</button>

                          <div id="new-obj-btns">
                            <button className="cancel-newrta" onClick={ ()=>{ setModalNewObj(false) } }>Cancelar</button>
                            <button className="send-newrta" onClick={ ()=>{ handleSendSugerencia() } }>Enviar sugerencia</button>
                          </div>

                       
                        <div className="close-mod" onClick={ ()=>{ setModalNewObj(false) } }> 
                          <img src="/assets/close.png" />
                        </div>
                    </div>  
                </div>             
              </div>
        </ModalContainer>

            )

       }
       
       
       return ( render() )
}




export default ModalNewObj;