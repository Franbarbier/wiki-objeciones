import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './Home.css';
import OpenCard from '../../components/OpenCard/OpenCard';


const Home = ({setActiveTab }) => {
    
    const [selectedId, setSelectedId] = useState(null)
    const[ buscador, setBuscador ] = useState('')
    const dispatch = useDispatch()

    const [openObjecion, setOpenObjecion] = useState(null)

    var projects = useSelector(state => state.projects)
    

    function changeBsucador(e){ 
        setBuscador(e.target.value)
    }

    useEffect(()=>{
        console.log(buscador)
    })

    useEffect(()=>{
        console.log(openObjecion)
    }, [openObjecion])


    const objeciones = [
        {
            id: 1,
            objecion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            respuestas : ['Llamalo en 15 minutos', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indus standard dummy text ever since the 1500s'],
            key_word : ['reunion', 'mas tarde', 'agenda']
        },
        {
            id: 2,
            objecion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been',
            respuestas : ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it'],
            key_word : ['reunion', 'mas tarde', 'agenda']
        },
        {
            id: 3,
            objecion: 'Lorem Ipsum is simply dummy text',
            respuestas : ['It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don look even slightly believable', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'],
            key_word : ['reunion', 'mas tarde', 'agenda']
        },
        {
            id: 4,
            objecion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been',
            respuestas : ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'],
            key_word : ['reunion', 'mas tarde', 'agenda']
        }
    ]


    
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
                            <div>
                                <img src= "/assets/bell.png"/>
                            </div>
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
                                                {obj.respuestas.map((rta, index)=>(
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
                                            {obj.respuestas.length > 2 &&
                                                <span className="mas-rtas">+{obj.respuestas.length -2}</span>
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