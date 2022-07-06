import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './Home.css';
import OpenCard from '../../components/OpenCard/OpenCard';
import Notifications from '../../components/Notificactions/Notifications';


const Home = ({setActiveTab }) => {
    
    const [selectedId, setSelectedId] = useState(null)
    const[ buscador, setBuscador ] = useState('')
    const dispatch = useDispatch()

    const [openObjecion, setOpenObjecion] = useState(null)
    const [openNotifications, setOpenNotifications] = useState(false)


    function changeBsucador(e){ 
        setBuscador(e.target.value)
    }

    useEffect(()=>{
        console.log(buscador)
    })

    useEffect(()=>{
        console.log(openObjecion)
    }, [openObjecion])


    const objeciones = useSelector(state => state.objeciones)


    
    // function checkBuscador(proyecto){
        
    //     function ifIsInTag(proyecto){
    //         for (let index = 0; index < proyecto.tags.length; index++) {
    //             const element = proyecto.tags[index];

    //             if (element.toLowerCase().includes(buscador.toLowerCase())) {
    //                 return true
    //             }
                
    //         }
    //         return false
    //     }
        
        
    //     // console.log(ifIsInTag(proyecto))

    //     if (buscador == '' || proyecto.name.toLowerCase().includes(buscador.toLowerCase()) || ifIsInTag(proyecto) ) {
    //         return true
    //     }else{
    //         console.log()
    //         return false
    //     }
    // }

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
                                <input type="text" placeholder='Buscar objeción'/>
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
                            {objeciones.map((obj)=>(
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
                                                            <div className='rtas-option'>
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

                <div id="new-objecion">
                    <div>
                        <div>
                            <button>+</button>
                        </div>
                    </div>
                </div>
              </div>

       }
       
       
       return ( render() )
}




export default Home;