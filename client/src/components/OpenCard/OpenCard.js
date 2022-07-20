import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import { createSugerencia } from '../../actions/sugerencias'

import './OpenCard.css';




const AddRta = ({ setNewRta, id_objecion }) => {
  
  const [rtaSugerida, setRtaSugerida] = useState('')

  const useDispatch2 = useDispatch()

  async function handleSendSugerencia(){

        if(rtaSugerida != ''){
          const onSuccess = () => ( 
            alert("Gracias por sugerir una respuesta! La vamos a ver cuanto antes."),
            setNewRta(false) )
          await createSugerencia({
            objecionId: id_objecion,
            rtas: [rtaSugerida],
            type: 1
          }, useDispatch2)
          onSuccess()
        }else{
          alert('No puedes enviar una sugerencia vacía!')
        }
  }


function render(){
    return  <div id="add-rta">
              <div>
                  <textarea onChange={(e)=>{ setRtaSugerida(e.target.value) }} placeholder="Envianos tu sugerencia para agregarla a esta objeción"></textarea>
                  <>
                    <button className="cancel-newrta" onClick={ ()=>{ setNewRta(false) } }>Cancelar</button>
                    <button className="send-newrta" onClick={(e)=>{ handleSendSugerencia() }}>Enviar sugerencia</button>
                  </>
              </div>             
            </div>

     }
     
     
     return ( render() )
}



const OpenCard = ({ objecion, setOpenObjecion }) => {
    
    // const dispatch = useDispatch()
    console.log(objecion)

    const [newRta, setNewRta] = useState(false)

  function render(){
      return  <div id="OpenCard-view" onClick={()=>{setOpenObjecion(null)}}>
                <div onClick={(e)=>{e.stopPropagation()}}>
                    <div>
                        <h3>{objecion.objecion}</h3>
                        <ul>
                          {objecion.rtas.map((rta)=>(
                            <li>
                              <p>{rta}</p>
                              <div onClick={ (e)=>{ 
                                  e.stopPropagation()
                                  var clicked;
                                  if (e.target.tagName == "IMG") {
                                    clicked = e.target
                                  }else{
                                    clicked = e.target.querySelector('img')
                                  }
                                  clicked.style.filter = "drop-shadow(0px 0 5px green)"
                                  clicked.style.transform = "scale(1.2)"
                                  navigator.clipboard.writeText(rta)

                                  setTimeout(() => {
                                  clicked.style.filter = "none"
                                  clicked.style.transform = "scale(1)"
                                    
                                  }, 1000);
                                  } }>
                                
                                <img src="/assets/copy.png"/>
                              </div>
                            </li>
                          ))}
                          { newRta && <AddRta id_objecion={objecion._id} setNewRta={setNewRta} />}
                        </ul>
                        { !newRta &&  <button id="new-rta" onClick={ ()=>{
                                    setNewRta(true)
                                    setTimeout(() => {
                                      document.querySelector('#OpenCard-view>div').scroll({ top: document.querySelector('#OpenCard-view>div').scrollHeight, behavior: 'smooth' });
                                    }, 200);
                          } }>Sugerir nueva respuesta</button>}

                       
                        <div id="close-mod" onClick={ ()=>{ setOpenObjecion(null) } }> 
                          <img src="/assets/close.png" />
                        </div>
                    </div>  
                </div>             
              </div>

       }
       
       
       return ( render() )
}




export default OpenCard;