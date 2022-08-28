import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import { createObjecion, deleteObjeciones } from '../../actions/objeciones';

// import PencilIcon from './assets/pencil.svg';


import ModalContainer from '../ModalContainer/ModalContainer';
import { createRespuesta } from '../../actions/respuestas';

export const NewObj = ({ setNewRta, checkIfExist, objExist }) => {


    const [currentRta, setCurrentRta] = useState('')
    const [rtas, setRtas] = useState([])
    const [currentTag, setCurrentTag] = useState('')
    const [tags, setTags] = useState([])
    
    const [objecion, setObjecion] = useState('')
    const [autor, setAutor] = useState('')

    const [createRta, setCreateRta] = useState({
        nombre : '',
        rta: '',
        variaciones: []
    })
    const [ifCreateRta, setIfCreateRta] = useState(false)
    
    const dispatch2 = useDispatch()


    function hagaseLaObj(e){
        e.preventDefault()
        let final_objecion = {
            objecion, rtas, tags, autor
        }
        
        
        
        createObjecion(final_objecion, dispatch2).then(
                (e)=> {
                  console.log(e)
                  if(createRta.rta.length && ifCreateRta){
                      let newRtaACrear = {...createRta}
                      newRtaACrear.objecion = e.newObj._id
                      createRespuesta(newRtaACrear, dispatch2).then(
                        (e)=>
                            console.log(e)
                        ).catch( (e) =>{
                            console.log('error:::', e.error)
                        } )
                  }
                  setCurrentRta('')
                    setRtas([])
                    setCurrentTag('')
                    setTags([])
                    setObjecion('')
                    setIfCreateRta(false )
                    setCreateRta({
                            nombre : '',
                            rta: '',
                            variaciones: []
                        })

            
                    setNewRta(false)

                }
                ).catch( (e) =>{
                  console.log('error:::', e.error)
              } )

    }

    useEffect(()=>{
        console.log(createRta)
    }, [createRta])



    function render(){
        return  (
                
            <ModalContainer tipo="newObj">
                    {objExist.length > 0 &&
                        <aside id="exist-cont">
                            <div id="alert-info">
                                <p>Hay {objExist.length} objeciones que pueden estar relacionadas.</p>
                                <span>+</span>
                            </div>
                            <div id="alert-detail">
                                {objExist.map((exist, index)=>(
                                    <div key={'exist'+index}>
                                        <p>{exist.objecion}</p>
                                        <ul>
                                            {exist.tags.map((tag)=>(
                                                <li>{tag}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </aside>

                    }
                <div id="NewObj">
                <div className='close-mod'>
                    <img onClick={ (e)=>{
                            e.stopPropagation()
                            setNewRta(false)
                        }} src="/assets/close.png"/>
                    </div>
                  <div>
                      <form>
                        <div>
                            <label>Objeción</label>
                            <textarea onChange={(e)=>{ 
                                checkIfExist(e.target.value)
                                setObjecion(e.target.value)
                            } } value={objecion}></textarea>
                        </div>
                        
                        <div>
                            <label>Key words</label>
                            <ul className='ul-editable'>
                                {tags.map((tag, index)=>(
                                    <li>
                                      <input data-index={index}
                                        onChange={ (e)=>{
                                          let newtags = [...tags];
                                          newtags[index] = e.target.value
                                          console.log(newtags)
                                          setTags(newtags)

                                        } }
                                        value={tag}
                                        key={`tags${index}`}
                                      />
                                      <div onClick={()=>{ 
                                        setTags( tags.filter(tagi =>  tagi != tag ) )
                                      }}><img src="/assets/close.png" /></div>
                                    </li>
                                ))}
                            </ul>
                            <input type="text" onChange={(e)=>{ setCurrentTag(e.target.value) } } value={currentTag} />
                            <button onClick={(e)=>{
                                                e.preventDefault()
                                                setTags([...tags, currentTag])
                                                setCurrentTag('')
                                            }}>+</button>
                        </div>

                        <div>
                            <label>Autor</label>
                            <input onChange={(e)=>{ 
                                setAutor(e.target.value)
                            } } value={autor} />
                        </div>

                        <div>
                            {!ifCreateRta ?
                            <button className="nueva-rta-btn" onClick={(e)=>{
                                e.preventDefault()
                                setIfCreateRta(true)
                                }}>Agregarle respuesta</button>
                            :
                            <div className='info-rta'>
                                    <div>
                                        <span>Nombre de la respuesta</span>
                                        <input value={createRta.nombre} onChange={(e)=>{ 
                                            let newRta = {...createRta}
                                            newRta.nombre = e.target.value
                                            setCreateRta(newRta)
                                         }} className='nombre-rta' />
                                    </div>


                                    <div>
                                    <span>Respuesta</span>
                                        <textarea onChange={(e)=>{ 
                                            let newRta = {...createRta}
                                            newRta.rta = e.target.value
                                            setCreateRta(newRta)
                                         }} value={createRta.rta} className='contenido-rta'></textarea>

                                        <div
                                        className='agregar-variante'
                                        onClick={ ()=>{
                                            let newRta = {...createRta}
                                            newRta.variaciones.push('')  
                                            setCreateRta(newRta)
                                            } }
                                        >
                                        <p>+</p>
                                        
                                        </div>
                                    
                                    
                                            {createRta.variaciones.length > 0 && <span className='variac-tit'>Variantes</span> }
                                            {createRta.variaciones.map((variante, index)=>(
                                                <div key={"variacion-cont"} className='campo-variaciones'>                        
                                                    <textarea 
                                                    value={variante}
                                                    onChange={(e)=>{
                                                        let newRta = {...createRta}
                                                        newRta.variaciones[index] = e.target.value
                                                        setCreateRta(newRta)
                                                    }}
                                                    key={'variante'+index}
                                                    />
                                                    <img
                                                        className='close-variac'
                                                        onClick={()=>{
                                                            let newRta = {...createRta}
                                                            newRta.variaciones.splice(index,1);
                                                            setCreateRta(newRta)
                                                        }}
                                                        src="./assets/close.png"
                                                    />
                                                </div>
                                            ))}
                                

                                            
                                        </div>
                                        {/* <p onClick={(e)=>{
                                            setCreateRta(false)
                                            }}>Descartar respuesta</p> */}
                        </div>
                        }
                    </div>


                       
                        
                        <button onClick={hagaseLaObj} id="create-obj">Crear</button>
                        <button  onClick={()=>{setNewRta(false)} } id="rene">Descartar cambios</button>
                      </form>

                  </div>             
                </div>
                </ModalContainer>
                )
    
         }
         
         
         return ( render() )
}