import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './OpenCard.css';




const AddRta = ({ setNewRta }) => {
 
function render(){
    return  <div id="add-rta">
              <div>
                  <textarea placeholder="Envianos tu sugerencia para agregarla a esta objeción"></textarea>
                  <button className="cancel-newrta" onClick={ ()=>{ setNewRta(false) } }>Cancelar</button>
                  <button className="send-newrta">Enviar sugerencia</button>
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
                              <div>
                                <img src="/assets/copy.png"/>
                              </div>
                            </li>
                          ))}
                          { newRta && <AddRta setNewRta={setNewRta} />}
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