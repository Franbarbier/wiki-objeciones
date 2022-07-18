import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './ObjInfo.css';
import { updateObjeciones } from '../../actions/objeciones';





const NewObj = ({ obj, setObjSelected }) => {


  const [currentRta, setCurrentRta] = useState('')
  const [rtas, setRtas] = useState()
  const [currentTag, setCurrentTag] = useState('')
  const [tags, setTags] = useState()
  
  const [objecion, setObjecion] = useState(obj.objecion)
  const [category, setCategory] = useState(obj.category)

  useEffect(()=>{
      console.log(rtas)
      console.log(tags)
    },[rtas, tags,objecion])

    useEffect(()=>{
      setTags(obj.tags)
      setRtas(obj.rtas)
    },[])
    

  const dispatch2 = useDispatch()


  function editObjecion(e){
      e.preventDefault()
      let objecion = {
          objecion, rtas, tags, category, _id: obj._id
      }
      setCurrentRta('')
      setRtas([])
      setCurrentTag('')
      setTags([])
      setObjecion('')
      setCategory('')
      setObjSelected(false)

      console.log(objecion)
      updateObjeciones({objecion}, dispatch2).then(
              (e)=> 
                console.log(e)      
              ).catch( (e) =>{
                console.log('error:::', e.error)
            } )

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
                          <ul className='ul-editable'>
                            {tags && 
                              <>
                              {rtas.map((rta, index)=>(
                                <li>
                                    <textarea data-index={index} value={rta}
                                            key={`rats${index}`}
                                            onChange={(e)=>{
                                              let newrtas = [...rtas]
                                              newrtas[index] = e.target.value
                                              setRtas(newrtas)
                                            } } ></textarea>
                                    <div onClick={()=>{ 
                                      setRtas( rtas.filter(rtita =>  rtita != rta ) )
                                    }}><img src="/assets/close.png" /></div>
                                    {/* <div onClick={()=>{setRtas(rtas.filter(rtita => rtita[index] ))}}><img src="/assets/close.png" /></div> */}
                                  </li>
                              ))}
                                    </>
                                  } 
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
                          <ul className='ul-editable'>

                            {tags && 
                              <>
                              {tags.map((tag, index)=>(
                                    // <li data-index={index}>{tag}</li>
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
                                </>
                              }
                              
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
                              {obj ?
                                  <option value={obj.category}>{obj.category}</option>
                                  :
                                  <option value="">Seleccionar categoría</option>    
                              }
                              <option value="Prueba1">Prueba1</option>
                              <option value="Prueba2">Prueba2</option>
                              <option value="Prueba3">Prueba3</option>
                              <option value="Prueba4">Prueba4</option>
                              <option value="Prueba5">Prueba5</option>
                          </select>
                      </div>
                      
                      <button onClick={editObjecion} id="create-obj">Guardar cambios</button>
                      <button  onClick={(e)=>{
                                  setObjSelected(false)
                                  e.preventDefault()
                                } } id="rene">Descartar</button>
                    </form>

                </div>             
              </div>
  
       }
       
       
       return ( render() )
}

const ObjInfo = ({ objecion, setObjSelected }) => {
    
    // const dispatch = useDispatch()
    console.log(objecion)

   

  function render(){
      return  <div id="ObjInfo-view">
                    <div>
                      <div className='close-mod'>
                        <img onClick={ (e)=>{
                              e.stopPropagation()
                              setObjSelected(false)
                            }} src="/assets/close.png"/>
                      </div>
                      <div>
                        <NewObj setObjSelected={setObjSelected} obj={objecion} />
                      </div>

                    </div>
              </div>

       }
       
       
       return ( render() )
}




export default ObjInfo;