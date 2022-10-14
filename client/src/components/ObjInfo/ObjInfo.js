import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './ObjInfo.css';
import { createObjecion, updateObjeciones } from '../../actions/objeciones';
import ModalContainer from '../ModalContainer/ModalContainer';
import { createRespuesta } from '../../actions/respuestas';
import { deleteSugerencias } from '../../actions/sugerencias';





const NewObj = ({ obj, setObjSelected, suge, sugeId }) => {


  const [currentRta, setCurrentRta] = useState('')
  const [rtas, setRtas] = useState([])
  const [currentTag, setCurrentTag] = useState('')
  const [tags, setTags] = useState([])
  
  const [objecion, setObjecion] = useState()
 
  const [category, setCategory] = useState()
  const [rtaSugerida, setRtaSugerida] = useState()


  const [createRta, setCreateRta] = useState({
      autor : '',
      nombre : '',
      rta: '',
      variaciones: []
  })
  const [ifCreateRta, setIfCreateRta] = useState(false)
  
    useEffect(()=>{
        console.log(createRta)
    }, [createRta])

    useEffect(()=>{
      if (suge) {
        
        if (obj.rtas.length > 0) {
          setCreateRta({...createRta, rta : obj.rtas[0].rta, nombre : obj.rtas[0].nombre})
          
          
        }
      }
    }, [])


    useEffect(()=>{
      
      if (obj.objecionId) {
          setTags(obj.objecionId.tags)
          setObjecion(obj.objecionId.objecion)
          
          setRtas(obj.objecionId.rtas)

        console.log('estoy alla')
          setRtaSugerida(obj.rtas[0])
          
      }else{
        if(obj.tags){
          setTags(obj.tags)
        }
       
        setRtas(obj.rtas)
        setObjecion(obj.objecion)
      }

    },[])
    

  const dispatch2 = useDispatch()

  console.log(sugeId)
  

  function handleAddRtas(e){
    e.preventDefault()

    let newRtaACrear = {...createRta}
    newRtaACrear.objecion = obj.objecionId._id
    createRespuesta(newRtaACrear, dispatch2).then(
      (e)=>
          console.log(e)
      ).catch( (e) =>{
          console.log('error:::', e.error)
      } )

  }

  function handleEditObj(e){

      var thisID = obj._id

      if (suge) { thisID = obj.objecionId._id }
      

      e.preventDefault()

      let objecionObj = {
          objecion, tags, category, _id: thisID
      }
      

      console.log(objecionObj)
      updateObjeciones({objecionObj}, dispatch2).then(
              (e)=>{ 
              
                if(createRta.rta.length && ifCreateRta){
                  let newRtaACrear = {...createRta}
                  newRtaACrear.objecion = thisID
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
                setObjSelected(false)
                deleteSugerencias([sugeId], dispatch2).then(
                  (e)=>console.log('se elimino la suge: ', sugeId)
                ).catch((e)=> console.log(e.error) )


              }).catch( (e) =>{
                console.log('error:::', e.error)
            } )

  }

  function handleCreateObj(e){
    e.preventDefault()
    
    let final_objecion = {
        objecion, tags, category
    }
    

    console.log(final_objecion)

    createObjecion(final_objecion, dispatch2).then(
            (e)=> {

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
              setCategory('')
              setObjSelected(false)
              deleteSugerencias([sugeId], dispatch2).then(
                (e)=>console.log('se elimino la suge: ', sugeId)
              ).catch((e)=> console.log(e.error) )
            
            }).catch( (e) =>{
              console.log('error:::', e.error)
          } )

}
 

  

  function render(){
      return  <div id="NewObj">
                <div>
                    <form>
                      <div>
                          <label>Objeción</label>
                          <textarea onChange={(e)=>{ setObjecion(e.target.value) } } disabled={ obj.type ? true : false} value={objecion}></textarea>
                      </div>
                      <div>
                          <label>Key words</label>
                          <ul className='ul-editable'>

                            {tags && 
                              <>
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
                                        disabled={ obj.type ? true : false}
                                      />

                                    </li>
                                ))}
                                </>
                              }
                              
                          </ul>

                      </div>
                     


                      <div>
                            {/* {!ifCreateRta && obj.rtas.length == 0 ? */}
                            {!ifCreateRta && sugeId &&
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

                      {console.log(suge)}
                      {suge ?
                      <>
                        {obj.objecionId ?
                          <button onClick={handleAddRtas} id="create-obj">Añadir respuesta</button>
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
                                  if(suge){
                                    if(window.confirm("Desea eliminar la sugerencia?")){

                                      deleteSugerencias([sugeId], dispatch2).then(
                                        (e)=>console.log('se elimino la suge: ', sugeId)
                                        ).catch((e)=> console.log(e.error) )
                                      }
                                  }
                                } } id="rene">Descartar</button>
                    </form>

                </div>             
              </div>
  
       }
       
       
       return ( render() )
}

const ObjInfo = ({ objecion, setObjSelected, suge=false, sugeId=null }) => {
    
    // const dispatch = useDispatch()

   

  function render(){
      return  (
        <ModalContainer tipo="objInfo" closeModal={ ()=>{ setObjSelected(false) } }>
                <div id="ObjInfo-view">
                    <div>
                      <div className='close-mod'>
                        <img onClick={ (e)=>{
                              e.stopPropagation()
                              setObjSelected(false)
                              
                            }} src="/assets/close.png"/>
                      </div>
                      <div>
                        <NewObj setObjSelected={setObjSelected} obj={objecion} suge={suge} sugeId={sugeId}/>
                      </div>

                    </div>
              </div>
        </ModalContainer>
              
            )

       }
       
       
       return ( render() )
}




export default ObjInfo;