import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './ObjInfo.css';
import { createObjecion, updateObjeciones } from '../../actions/objeciones';
import ModalContainer from '../ModalContainer/ModalContainer';





const NewObj = ({ obj, setObjSelected, suge }) => {


  const [currentRta, setCurrentRta] = useState('')
  const [rtas, setRtas] = useState([])
  const [currentTag, setCurrentTag] = useState('')
  const [tags, setTags] = useState([])
  
  const [objecion, setObjecion] = useState()
  const [category, setCategory] = useState()
  
  const [rtaSugerida, setRtaSugerida] = useState()
  
    useEffect(()=>{
        console.log(tags)
        console.log(obj)
    })

    useEffect(()=>{
      
      if (obj.objecionId) {
          setTags(obj.objecionId.tags)
          setObjecion(obj.objecionId.objecion)
          setCategory(obj.objecionId.category)
          setRtas(obj.objecionId.rtas)

        console.log('estoy alla')
          setRtaSugerida(obj.rtas[0])
          
      }else{
        if(obj.tags){
          setTags(obj.tags)
        }
        if (obj.category) {
          setCategory(obj.category)
        }
        setRtas(obj.rtas)
        setObjecion(obj.objecion)
      }

    },[])
    

  const dispatch2 = useDispatch()


  function handleEditObj(e){

      var thisID = obj._id

      if (suge) { thisID = obj.objecionId._id }

      e.preventDefault()

      let objecionObj = {
          objecion, rtas, tags, category, _id: thisID
      }
      setCurrentRta('')
      setRtas([])
      setCurrentTag('')
      setTags([])
      setObjecion('')
      setCategory('')
      setObjSelected(false)

      console.log(objecionObj)
      updateObjeciones({objecionObj}, dispatch2).then(
              (e)=> 
                console.log(e)      
              ).catch( (e) =>{
                console.log('error:::', e.error)
            } )

  }

  function handleCreateObj(e){
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
    setObjSelected(false)

    console.log(final_objecion)

    createObjecion(final_objecion, dispatch2).then(
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
                            {rtas && 
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
                                  
                                  <option value={
                                      obj.objecionId ?
                                      obj.objecionId.category
                                      :
                                      obj.category
                                    }>{
                                      obj.objecionId ?
                                      obj.objecionId.category
                                      :
                                      obj.category
                                      }</option>
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
                      {suge ?
                      <>
                        {obj.objecionId ?
                          <button onClick={handleEditObj} id="create-obj">Guardar cambios</button>
                        :
                          <button onClick={handleCreateObj} id="create-obj">Crear Objecion</button>
                        }
                      </>
                        :
                      <button onClick={handleEditObj} id="create-obj">Guardar cambios</button>
                      }
                      <button  onClick={(e)=>{
                                  e.preventDefault()
                                  setObjSelected(false)
                                } } id="rene">Descartar</button>
                    </form>

                </div>             
              </div>
  
       }
       
       
       return ( render() )
}

const ObjInfo = ({ objecion, setObjSelected, suge=false }) => {
    
    // const dispatch = useDispatch()
    console.log(objecion)

   

  function render(){
      return  (
        <ModalContainer tipo="objInfo">
                <div id="ObjInfo-view">
                    <div>
                      <div className='close-mod'>
                        <img onClick={ (e)=>{
                              e.stopPropagation()
                              setObjSelected(false)
                            }} src="/assets/close.png"/>
                      </div>
                      <div>
                        <NewObj setObjSelected={setObjSelected} obj={objecion} suge={suge}/>
                      </div>

                    </div>
              </div>
        </ModalContainer>
              
            )

       }
       
       
       return ( render() )
}




export default ObjInfo;