import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import { createObjecion, deleteObjeciones } from '../../actions/objeciones';


import './ObjTable.css';
import ObjInfo from '../ObjInfo/ObjInfo';

const NewObj = ({ setNewRta }) => {


    const [currentRta, setCurrentRta] = useState('')
    const [rtas, setRtas] = useState([])
    const [currentTag, setCurrentTag] = useState('')
    const [tags, setTags] = useState([])
    
    const [objecion, setObjecion] = useState('')
    const [category, setCategory] = useState('')

    
    const dispatch2 = useDispatch()


    function hagaseLaObj(e){
        e.preventDefault()
        let final_objecion = {
            objecion, rtas, tags, category
        }
        setCurrentRta('')
        setRtas([])
        setCurrentTag('')
        setTags([])
        setObjecion('')
        setCategory('')
        setNewRta(false)

        createObjecion({final_objecion}, dispatch2).then(
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
        return  <div id="NewObj">
                  <div>
                      <form>
                        <div>
                            <label>Objeción</label>
                            <textarea onChange={(e)=>{ setObjecion(e.target.value) } } value={objecion}></textarea>
                        </div>
                        <div>
                            <label>Respuestas</label>
                            <ul>
                                {rtas.map((rta, index)=>(
                                    <li data-index={index}>{rta}</li>
                                ))}
                            </ul>
                            <textarea onChange={(e)=>{ setCurrentRta(e.target.value) } } value={currentRta}></textarea>
                            <button onClick={(e)=>{
                                                e.preventDefault()
                                                setRtas([...rtas, currentRta])
                                                setCurrentRta('')
                                            }}>Agregar</button>
                        </div>
                        <div>
                            <label>Key words</label>
                            <ul>
                                {tags.map((tag, index)=>(
                                    <li data-index={index}>{tag}</li>
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
                            <label>Categoría</label>
                            <select onChange={(e)=>{ setCategory(e.target.value) } } >
                                <option value="">Seleccionar categoría</option>
                                <option value="Prueba1">Prueba1</option>
                                <option value="Prueba2">Prueba2</option>
                                <option value="Prueba3">Prueba3</option>
                                <option value="Prueba4">Prueba4</option>
                                <option value="Prueba5">Prueba5</option>
                            </select>
                        </div>
                        
                        <button onClick={hagaseLaObj} id="create-obj">Crear</button>
                        <button  onClick={()=>{setNewRta(false)} } id="rene">Descartar</button>
                      </form>

                  </div>             
                </div>
    
         }
         
         
         return ( render() )
}

const ObjTable = ({ objeciones }) => {
    
    // const dispatch = useDispatch()
    const [newObj, setNewRta] = useState(false)
    const [objetas, setObjetas] = useState(objeciones)
    const [modalObj, setModalObj] = useState(false)
   
    const [objSelected, setObjSelected] = useState(false)
    

    const dispatch = useDispatch()

    useEffect(()=>{
        setObjetas(objeciones)
        console.log(objeciones)
    } )

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
                        <div className="id-cell th">Id</div>
                        <div className="obj-cell th">Objecion</div>
                        <div className="cant-cell th">Cant.</div>
                        <div className="rtas-cell th">Respuestas</div>
                        <div className="key-cell th">Keywords</div>
                        <div className="cat-cell th">Categoría</div>
                    </div>
                    {objetas.map((obj, index)=>(
                       <div className='tr' onClick={()=>{setObjSelected(obj)}}>
                            <div className="id-cell td"><p>{index + 1}</p></div>
                            <div className="obj-cell td"><p title={obj.objecion}>{obj.objecion}</p></div>
                        
                            <div className="cant-cell td"><p>{obj.rtas.length}</p></div>
                            <div className="rtas-cell td">
                                {obj.rtas.map((rta)=>(
                                    <p>{rta}</p>
                                ))}
                            </div>
                            <div className="key-cell td">
                                {obj.tags.map((tag)=>(
                                    <p>{tag}</p>
                                ))}
                            </div>
                            <div className="cat-cell td"><p>{obj.category}</p></div>

                            <div className='delete-btn' onClick={()=>{ deleteObjeciones([obj._id], dispatch) }}>DELETE</div>
                    </div>

                    ))}

                    {objSelected &&
                        <ObjInfo objecion={objSelected} setObjSelected={setObjSelected}/>
                    }

                </div>
              </div>

       }
       
       
       return ( render() )
}




export default ObjTable;