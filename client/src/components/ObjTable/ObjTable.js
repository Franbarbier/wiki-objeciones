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
import EditRtas from '../EditRtas/EditRtas2';
import { createRespuesta, deleteRespuestas } from '../../actions/respuestas';
import { NewObj } from '../CreateObj/CreateObj';



const RtasDesplegadas = ({ respuestas, setAddRtaModal, setObjIdRtas, obj, setRtaData }) => {

    function render(){
        return  (

                <div className="rtas-cell" onClick={(e)=>{
                    e.stopPropagation()
                    // setObjIdRtas(obj)
                    // setAddRtaModal(true)
                }}>
                    {respuestas.map((rta, index)=>(
                            <motion.p
                                className="respuestas-desplegadas"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: (index / 20) }}
                                
                                onClick={(e)=>{
                                    setRtaData(rta)
                                    setObjIdRtas(obj)
                                    setAddRtaModal(true)
                                }}

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
                                setRtaData({nombre: '',
                                rta: '',
                                autor: '',
                                variaciones : [ ]})
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
    const [objetas, setObjetas] = useState([])
    
    const [modalObj, setModalObj] = useState(false)
    const [arrow, setArrow] = useState(-1)
   
    const [objSelected, setObjSelected] = useState(false)
    const [addRtaModal, setAddRtaModal] = useState(false)
    const [objIdRtas, setObjIdRtas] = useState(false)
    const [rtaData, setRtaData] = useState(false)
    
    const [objExist, setObjExist] = useState([])
    
    const [buscador, setBuscador] = useState()

    const dispatch = useDispatch()

    useEffect(()=>{
        if (buscador != "") {
         var searchResult = []
            

         let newBuscador = buscador || '';
 
             for (let index = 0; index < objeciones.length; index++) {
                 const element = objeciones[index] || '';
                 var tieneTag = false
                 if (element.tags.length> 0) {
                     element.tags.find(element => {
                         if (element.toLowerCase().includes(newBuscador.toLowerCase())) {
                         tieneTag = true
                     }
                 });
                }

                var tieneObj = false
                 if (element.objecion.toLowerCase().includes(newBuscador.toLowerCase())) {
                     tieneObj = true
                 }
 
 
                 if (tieneTag || tieneObj) {
                     // return element
                     searchResult.push(element);
 
                 }
                }
             setObjetas(searchResult)
        }else{
             setObjetas(objeciones)
        }

     }, [buscador])
     
    useEffect(() => {
        setObjetas(objeciones);
    }, [objeciones])
     

    
    const respuestas = useSelector(state => state.respuestas)

    function getCantRespuestasDeObj(obj_id) {
        const cantRta = respuestas.filter((rtass)=>rtass.objecion._id == obj_id)

        return cantRta.length
    }

    function getRespuestasDeObj(obj_id) {
        const respuestas_asociadas = respuestas.filter((rtass)=>rtass.objecion._id == obj_id)
        return respuestas_asociadas
    }


    
    



    // const selectNumCompletedTodos = createSelector(
    //     (state) => state.todos,
    //     (todos) => todos.filter((todo) => todo.completed).length
    //   )
      
    // const CompletedTodosCounter = () => {
    //     const numCompletedTodos = useSelector(selectNumCompletedTodos)
    //     return <div>{numCompletedTodos}</div>
    // }
      



    function checkIfExist(value) {
        if (value.length > 4) {
            

           var searchResult = []

            for (let index = 0; index < objeciones.length; index++) {
                const element = objeciones[index];
                var tieneTag = false
                element.tags.find(element => {
                    if (element.toLowerCase().includes(value.toLowerCase())) {
                        tieneTag = true
                    }
                });
               var tieneObj = false
                if (element.objecion.toLowerCase().includes(value.toLowerCase())) {
                    tieneObj = true
                }


                if (tieneTag || tieneObj) {
                    // return element
                    searchResult.push(element);

                }
               }
            }else{
                setObjExist([])
                return false;
            }

            setObjExist(searchResult)
    }



  function render(){
      return  <div id="ObjTable-view">
                <div className="table-config">
                    {!newObj ?
                        <>
                            <button id="add-new-obj" onClick={()=>{setNewRta(true)}}>Crear nueva objecion</button>
                            <input placeholder="Buscar objecion" onChange={(e)=>{setBuscador(e.target.value)}} value={buscador}/>
                        </>
                        :
                        <NewObj setObjExist={setObjExist} setNewRta={setNewRta} setRtaData={setRtaData} setObjIdRtas={setObjIdRtas} setAddRtaModal={setAddRtaModal} checkIfExist={checkIfExist} objExist={objExist} />
                    }

                    <div>

                    </div>
                </div>

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
                       <div className={'tr'} onClick={ ()=>{ setArrow( arrow != index ? index : -1 ) }} key={"obecion-row-"+index}>
                        <div className={arrow == index && 'opened'}>
                            <div className="id-cell td"><p>{index + 1}</p></div>
                            <div className="arrow-cont">
                                <img className={arrow == index ? "arrowAbierta" : "arrowCerrada"} src="/assets/arrowsin.png" />
                            </div>
                            <div className="obj-cell td">
                                
                                <p title={obj.objecion}>{obj.objecion}</p>
                                <div>
                                    {arrow == index &&
                                        <RtasDesplegadas setRtaData={setRtaData} respuestas={ getRespuestasDeObj(obj._id) } setAddRtaModal={setAddRtaModal} setObjIdRtas={setObjIdRtas} obj={obj}/>
                                    }
                                </div>
                            </div>
                        
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

                                    if (window.confirm("Desea eliminar esta objecion y sus respeustas?") == true) {
                                        
                                        deleteObjeciones([obj._id], dispatch)
                                        const rtasAEliminar = getRespuestasDeObj(obj._id)
                                        var idsRtasAeliminar = []
                                        for (let index = 0; index < rtasAEliminar.length; index++) {
                                            const element = rtasAEliminar[index];
                                            idsRtasAeliminar.push(element._id)
                                        }
                                        deleteRespuestas(idsRtasAeliminar, dispatch)
                                    }

                                }}>
                                <img src="/assets/trash.svg"/>
                            </div>
                        </div>
                        
                                
                    </div>

                    ))}

                    {objSelected &&
                        // <ObjInfo checkIfExist={checkIfExist} objecion={objSelected} setObjSelected={setObjSelected}/>
                        <NewObj setNewRta={setNewRta} checkIfExist={checkIfExist} objExist={objExist} objSelected={objSelected} setObjSelected={setObjSelected}/>
                    }
                    {addRtaModal &&
                        <EditRtas objecion={objIdRtas} setAddRtaModal={setAddRtaModal} rta={rtaData} setRtaData={setRtaData} />
                    }

                </div>
              </div>

       }
       
       
       return ( render() )
}




export default ObjTable;