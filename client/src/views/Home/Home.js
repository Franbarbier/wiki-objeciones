import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion, AnimatePresence } from "framer-motion"

import './Home.css';
import OpenCard from '../../components/OpenCard/OpenCard';
import Notifications from '../../components/Notificactions/Notifications';
import ModalNewObj from '../../components/ModalNewObj/ModalNewObj';
import EditRtas from '../../components/EditRtas/EditRtas2';
import SugRtaModal from '../../components/SugRtaModal/SugRtaModal';


const Home = ({setActiveTab }) => {
    
    const [selectedId, setSelectedId] = useState(null)
    const [hovered, setHovered] = useState(false)
    const [modalNewObj, setModalNewObj] = useState(false)
    const dispatch = useDispatch()
    
    const [openObjecion, setOpenObjecion] = useState(null)
    const [openNotifications, setOpenNotifications] = useState(false)
    
    const respuestas = useSelector(state => state.respuestas)
    const objeciones = useSelector(state => state.objeciones)
    const [buscador, setBuscador] = useState([])

    const [objExist, setObjExist] = useState([])
    const [objSelected, setObjSelected] = useState(false)
    const [addRtaModal, setAddRtaModal] = useState(false)
    const [rtaData, setRtaData] = useState(false)
    // useEffect(()=>{
    //     console.log(respuestas)
    //     setBuscador(respuestas)
    // }, [])
    
  

    
    function handleBuscador(e) {
        let serchWord = e.target.value;
        let newFilterObj = respuestas.filter((value)=>{
                return value.rta.toLowerCase().includes( serchWord.toLowerCase() )
            })
            
           var searchResult = []

           for (let index = 0; index < respuestas.length; index++) {
                const element = respuestas[index];

                var tieneRta = false
                if(element.rta.toLowerCase().includes(serchWord.toLowerCase()) ){
                    tieneRta = true
                }

                var tieneTag = false
                element.objecion.tags.find(element => {
                    if (element.toLowerCase().includes(serchWord.toLowerCase())) {
                        tieneTag = true
                    }
                });
                // console.log( element.tags )

                var tieneObj = false
                if (element.objecion.objecion.toLowerCase().includes(serchWord.toLowerCase())) {
                    tieneRta = true
                }

                if (tieneRta || tieneTag || tieneObj) {
                    // return element
                    searchResult.push(element);

                }
                
            }

            if (serchWord == "") {
                setBuscador([])
                return false;
            }
    

            setBuscador(searchResult)

    }
    

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
      return  <div id="Home-view">
                <div>
                    <div id="top-bar">
                        <div id="buscador">
                            <div>
                                <label>
                                    <img src= "/assets/lupa.png"/>
                                    <span>🔥</span>
                                </label>
                                <input type="text" onChange={ handleBuscador } placeholder='Buscar objeción'/>
                            </div>
                        </div>
                        <div id="notifications">
                            <div onClick={()=>{ setOpenNotifications(!openNotifications) }}>
                                <img src= "/assets/bell.png"/>
                            </div>
                            {openNotifications &&
                                <Notifications setOpenNotifications={setOpenNotifications} openNotifications={openNotifications} />
                            }
                        </div>
                    </div>
                    <div id="resultados-cont">
                        <div>
                            {buscador.map((rta)=>(
                                <div>
                                    <div onClick={(e)=>{
                                        e.target.classList.add("agrandado")
                                        setOpenObjecion(rta)
                                    }} className='objecion-card'>
                                        <div>
                                            <h5>{rta.objecion.objecion}</h5>
                                        </div>
                                        <div>
                                            <h3>{rta.nombre}</h3>
                                        </div>
                                        <div>
                                            <h4>{rta.rta}</h4>
                                        </div>
                                        <div className='autor-cont'>
                                           <span>Autor:</span>
                                           <span>{rta.autor ? rta.autor : "Anónimo"}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    { openObjecion && 
                        <OpenCard setOpenObjecion={setOpenObjecion} rta={openObjecion}/>
                    }
                </div>
                    {buscador.length == 0 &&
                        <div>
                            <p id="no-search">Buscá una objeción que tengas. (◍•ᴗ•◍)✧*。</p>
                        </div>
                    }

                <div id="new-objecion"
                onMouseEnter={() => setHovered("new-obj")}
                onMouseLeave={() => setHovered(false)}
                onClick={ ()=>{ setModalNewObj(true) } }>
                    <div>
                        <AnimatePresence>
                        {hovered == "new-obj" &&
                            <motion.aside
                            initial={{opacity : 0, y: 30}}
                            exit={{opacity : 0, y: 30}}
                            animate={{opacity : 1, y: 0}}>
                                <p>Sugerir una nueva objeción</p>
                            </motion.aside>
                        }
                        </AnimatePresence>

                        <div>
                            <span>+</span>
                        </div>
                    </div>
                </div>
                {modalNewObj &&
                    <ModalNewObj setModalNewObj={setModalNewObj} setObjSelected={setObjSelected} objExist={objExist} setObjExist={setObjExist} setRtaData={setRtaData} checkIfExist={checkIfExist}/>
                }
                {addRtaModal &&
                    <EditRtas objecion={objSelected} setObjSelected={setObjSelected} setAddRtaModal={setAddRtaModal} rta={rtaData} setRtaData={setRtaData} />
                }
                {objSelected &&
                    <SugRtaModal objecion={objSelected} setObjSelected={setObjSelected} />

                }
              </div>

       }
       
       
       return ( render() )
}




export default Home;