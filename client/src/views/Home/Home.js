import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion, AnimatePresence } from "framer-motion"

import './Home.css';
import OpenCard from '../../components/OpenCard/OpenCard';
import Notifications from '../../components/Notificactions/Notifications';
import ModalNewObj from '../../components/ModalNewObj/ModalNewObj';


const Home = ({setActiveTab }) => {
    
    const [selectedId, setSelectedId] = useState(null)
    const [hovered, setHovered] = useState(false)
    const [modalNewObj, setModalNewObj] = useState(false)
    const[ buscador, setBuscador ] = useState([])
    const dispatch = useDispatch()

    const [openObjecion, setOpenObjecion] = useState(null)
    const [openNotifications, setOpenNotifications] = useState(false)
    
    const objeciones = useSelector(state => state.objeciones)

    useEffect(()=>{
        setBuscador(objeciones)
    }, [])

    function handleBuscador(e) {
        let serchWord = e.target.value;
        let newFilterObj = objeciones.filter((value)=>{
                return value.objecion.toLowerCase().includes( serchWord.toLowerCase() )
            })
            
           var searchResult = []

           for (let index = 0; index < objeciones.length; index++) {
                const element = objeciones[index];

                var tieneObj = false
                if(element.objecion.toLowerCase().includes(serchWord.toLowerCase()) ){
                    tieneObj = true
                }

                var tieneTag = false
                element.tags.find(element => {
                    if (element.toLowerCase().includes(serchWord.toLowerCase())) {
                        tieneTag = true
                    }
                });
                // console.log( element.tags )

                var tieneRta = false
                element.rtas.find(element => {
                    if (element.toLowerCase().includes(serchWord.toLowerCase())) {
                        tieneRta = true
                    }
                });

                if (tieneObj || tieneTag || tieneRta) {
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

    useEffect(()=>{
        console.log(buscador)
    }, [buscador])


    


  function render(){
      return  <div id="Home-view">
                <div>
                    <div id="top-bar">
                        <div id="buscador">
                            <div>
                                <label>
                                    <img src= "/assets/lupa.png"/>
                                    <span>????</span>
                                </label>
                                <input type="text" onChange={ handleBuscador } placeholder='Buscar objeci??n'/>
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
                            {buscador.map((obj)=>(
                                <div>
                                    <div onClick={(e)=>{
                                        e.target.classList.add("agrandado")
                                        setOpenObjecion(obj)
                                    }} className='objecion-card'>
                                        <div>
                                            <h4>{obj.objecion}</h4>
                                        </div>
                                        <div>
                                            <ul>
                                                {obj.rtas.map((rta, index)=>(
                                                    <>
                                                    {index < 2 &&
                                                        <li className="rta">
                                                            <p>{rta}</p>
                                                            <div className='rtas-option'
                                                            onClick={ (e)=>{ 
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
                                                                <img src="/assets/copy.png" />
                                                            </div>
                                                        </li>
                                                    }
                                                    </>
                                                ))}
                                            </ul>
                                            {obj.rtas.length > 2 &&
                                                <span className="mas-rtas">+{obj.rtas.length -2}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    { openObjecion && 
                        <OpenCard setOpenObjecion={setOpenObjecion} objecion={openObjecion}/>
                    }
                </div>
                    {buscador.length == 0 &&
                        <div>
                            <p id="no-search">Busc?? una objeci??n que tengas. (???????????????)???*???</p>
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
                                <p>Sugerir una nueva objeci??n</p>
                            </motion.aside>
                        }
                        </AnimatePresence>

                        <div>
                            <span>+</span>
                        </div>
                    </div>
                </div>
                {modalNewObj &&
                    <ModalNewObj setModalNewObj={setModalNewObj}/>
                }
              </div>

       }
       
       
       return ( render() )
}




export default Home;