import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import { createObjecion, deleteObjeciones } from '../../actions/objeciones';

// import PencilIcon from './assets/pencil.svg';


import './ObjTable.css';
import ObjInfo from '../ObjInfo/ObjInfo';
import ModalContainer from '../ModalContainer/ModalContainer';
import EditRtas from '../EditRtas/EditRtas';

const NewObj = ({ setNewRta }) => {


    const [currentRta, setCurrentRta] = useState('')
    const [rtas, setRtas] = useState([])
    const [currentTag, setCurrentTag] = useState('')
    const [tags, setTags] = useState([])
    
    const [objecion, setObjecion] = useState('')


    
    const dispatch2 = useDispatch()


    function hagaseLaObj(e){
        e.preventDefault()
        let final_objecion = {
            objecion, rtas, tags
        }
        setCurrentRta('')
        setRtas([])
        setCurrentTag('')
        setTags([])
        setObjecion('')
  
        setNewRta(false)
        
        
        createObjecion(final_objecion, dispatch2).then(
                (e)=> 
                  console.log(e)      
                ).catch( (e) =>{
                  console.log('error:::', e.error)
              } )

        // dispatch( createObjecion({final_objecion}) ).then(
        //     (e)=> 
        //       console.log(e)      
        //     ).catch( (e) =>{
        //       console.log('error:::', e.error)
        //   } )

    }


    function render(){
        return  (
                
            <ModalContainer tipo="newObj">
                <div id="NewObj">
                  <div>
                      <form>
                        <div>
                            <label>Objeción</label>
                            <textarea onChange={(e)=>{ setObjecion(e.target.value) } } value={objecion}></textarea>
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
                       
                        
                        <button onClick={hagaseLaObj} id="create-obj">Crear</button>
                        <button  onClick={()=>{setNewRta(false)} } id="rene">Descartar</button>
                      </form>

                  </div>             
                </div>
                </ModalContainer>
                )
    
         }
         
         
         return ( render() )
}


const RtasDesplegadas = ({ respuestas, setAddRtaModal, setObjIdRtas, obj }) => {

    function render(){
        return  (

                <div className="rtas-cell">
                    {respuestas.map((rta, index)=>(
                            <motion.p
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: 0.+ index }}                                        
                            ><i>{rta.nombre}</i></motion.p>
                        ))}
                        <>{respuestas.length == 0 &&
                            <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}                                        
                        ><i>No hay respeustas para esta objeción.</i></motion.p>
                        }</>

                        <div className="agregar-rta"
                            onClick={(e)=>{
                                e.stopPropagation()
                                setObjIdRtas(obj)
                                setAddRtaModal(true)
                            }}
                        >
                            <button>+</button>
                            {/* <button>Agregar respeusta</button> */}
                        </div>
                </div> 
                )
    
         }
         
         
         return ( render() )
}



const ObjTable = ({ objeciones }) => {
    
    // const dispatch = useDispatch()
    const [newObj, setNewRta] = useState(false)
    const [objetas, setObjetas] = useState(objeciones)
    const [modalObj, setModalObj] = useState(false)
    const [arrow, setArrow] = useState(-1)
   
    const [objSelected, setObjSelected] = useState(false)
    const [addRtaModal, setAddRtaModal] = useState(false)
    const [objIdRtas, setObjIdRtas] = useState(false)
    

    const dispatch = useDispatch()

    useEffect(()=>{
        setObjetas(objeciones)
        console.log(objeciones)
    } )
    
    const respuestas = useSelector(state => state.respuestas)

    function getCantRespuestasDeObj(obj_id) {
        const cantRta = respuestas.filter((rtass)=>rtass.objecion._id == obj_id)
        return cantRta.length
    }

    function getRespuestasDeObj(obj_id) {
        const respuestas_asociadas = respuestas.filter((rtass)=>rtass.objecion._id == obj_id)
        return respuestas_asociadas
    }
    

    // useEffect(()=>{
    //    console.log(objetas)
    // }, [objetas])

  function render(){
      return  <div id="ObjTable-view">
                <div className="table-config">
                    {!newObj &&
                        <button id="add-new-obj" onClick={()=>{setNewRta(true)}}>Crear nueva objecion</button>
                    }
                    <div>

                    </div>
                </div>
                    {newObj && <NewObj setNewRta={setNewRta} />}
                <div className='table'>
                    <div className='tr'>
                        <div>
                            <div className="id-cell th">Id</div>
                            <div className="arrow-cont">
                            </div>
                            <div className="obj-cell th">Objecion</div>
                            <div className="cant-cell th">Rtas.</div>
                            {/* <div className="rtas-cell th">Respuestas</div> */}
                            <div className="key-cell th">Keywords</div>
                            {/* <div className="cat-cell th">Categoría</div> */}
                            <div className='row-opts'></div>
                            <div className='row-opts'></div>
                        </div>
                    </div>
                    {objetas.map((obj, index)=>(
                       <div className='tr' onClick={ ()=>{ setArrow( arrow != index ? index : -1 ) }}>
                        <div>
                            <div className="id-cell td"><p>{index + 1}</p></div>
                            <div className="arrow-cont">
                                <img className={arrow == index ? "arrowAbierta" : "arrowCerrada"} src="/assets/arrowsin.png" />
                            </div>
                            <div className="obj-cell td"><p title={obj.objecion}>{obj.objecion}</p></div>
                        
                            <div className="cant-cell td"><p>{getCantRespuestasDeObj(obj._id)}</p></div>
                            {/* <div className="rtas-cell td">
                                {obj.rtas.map((rta)=>(
                                    <p>{rta}</p>
                                ))}
                            </div> */}
                            <div className="key-cell td">
                                {obj.tags.map((tag)=>(
                                    <p>{tag}</p>
                                ))}
                            </div>
                            
                            <div className='row-opts' onClick={()=>{setObjSelected(obj)}}>
                                <img src="/assets/pencil.svg"/>
                            </div>
                            <div className='row-opts'
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    deleteObjeciones([obj._id], dispatch) 
                                }}>
                                <img src="/assets/trash.svg"/>
                            </div>
                        </div>

                            {arrow == index &&
                            <RtasDesplegadas respuestas={ getRespuestasDeObj(obj._id) } setAddRtaModal={setAddRtaModal} setObjIdRtas={setObjIdRtas} obj={obj}/>
                            // <div className="rtas-cell">
                            //     {obj.rtas.map((rta, index)=>(
                            //             <motion.p
                            //                 initial={{ opacity: 0, y: -20 }}
                            //                 animate={{ opacity: 1, y: 0 }}
                            //                 transition={{ duration: 0.2, delay: 0.+ index }}                                        
                            //             ><i>{rta}</i></motion.p>
                            //         ))}
                            //         <>{obj.rtas.length == 0 &&
                            //              <motion.p
                            //              initial={{ opacity: 0, y: -20 }}
                            //              animate={{ opacity: 1, y: 0 }}
                            //              transition={{ duration: 0.2 }}                                        
                            //          ><i>No hay respeustas para esta objeción.</i></motion.p>
                            //         }</>

                            //         <div className="agregar-rta"
                            //             onClick={(e)=>{
                            //                 e.stopPropagation()
                            //                 setObjIdRtas(obj)
                            //                 setAddRtaModal(true)
                            //             }}
                            //         >
                            //             <button>+</button>
                            //             {/* <button>Agregar respeusta</button> */}
                            //         </div>
                            // </div> 
                           
                            }

                            {/* <div className='delete-btn' onClick={(e)=>{
                                e.stopPropagation()
                                deleteObjeciones([obj._id], dispatch) 
                                }}>DELETE</div> */}
                                
                    </div>

                    ))}

                    {objSelected &&
                        <ObjInfo objecion={objSelected} setObjSelected={setObjSelected}/>
                    }
                    {addRtaModal &&
                        <EditRtas objecion={objIdRtas} setAddRtaModal={setAddRtaModal} />
                    }

                </div>
              </div>

       }
       
       
       return ( render() )
}




export default ObjTable;