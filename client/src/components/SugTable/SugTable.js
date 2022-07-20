import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"



import './SugTable.css';
import ObjInfo from '../ObjInfo/ObjInfo';
import { deleteSugerencias } from '../../actions/sugerencias';



const SugTable = ({ sugerencias }) => {
    
    // const dispatch = useDispatch()
    const [newObj, setNewRta] = useState(false)
    const [objetas, setObjetas] = useState(sugerencias)
    const [modalObj, setModalObj] = useState(false)
   
    const [sugSelected, setSugSelected] = useState(false)
    

    const dispatch = useDispatch()

    useEffect(()=>{
        setObjetas(sugerencias)
        console.log(sugerencias)
    } )

    // useEffect(()=>{
    //    console.log(objetas)
    // }, [objetas])

  function render(){
      return  <div id="SugTable-view">
                <div className="table-config">
                    
                </div>
                
                <div className='table'>
                    <div className='tr'>
                        <div className="id-cell th">Id</div>
                        <div className="obj-cell th">Objecion</div>
                        <div className="cant-cell th">Cant.</div>
                        <div className="rtas-cell th">Respuestas</div>
                        <div className="tipo-cell th">Tipo</div>
                        <div className="estado-cell th">Estado</div>
                    </div>
                    {sugerencias.map((suge, index)=>(

                        <div className='tr' onClick={()=>{setSugSelected(suge)}}>
                            <div className="id-cell td"><p>{index + 1}</p></div>
                            {suge.type == 0 && 
                            <div className="obj-cell td" title={suge.objecion }>{suge.objecion }</div>
                            }

                            {suge.type == 1 && 
                            <div className="obj-cell td" title={ suge.objecionId.objecion }>{ suge.objecionId.objecion }</div>
                            }

                            <div className="cant-cell td">{ suge.rtas.length}</div>
                            <div className="rtas-cell td">{suge.rtas.map((rta)=>(
                                    <p>{rta}</p>
                                ))}
                            {suge.rtas.length == 0 &&  <p><i>No sugirieron respuestas.</i></p>}    
                            </div>
                            <div className="tipo-cell td">{suge.type == 0 ? "Objeción" : 'Respuesta'}</div>
                            <div className="estado-cell td" onClick={(e)=>{ e.stopPropagation() }}>
                                <select>
                                    <option>{suge.status ? "Atendida" : "Pendiente"}</option>
                                    <option>Atendida</option>
                                    <option>Pendiente</option>
                                </select>
                            </div>

                            <div className='delete-btn' onClick={(e)=>{
                                 e.stopPropagation() 
                                 deleteSugerencias([suge._id], dispatch)
                                 }}>DELETE</div>
                            
                        </div>
                        ))
                    }
                   

                    {sugSelected &&
                        <ObjInfo objecion={sugSelected} suge={true} setObjSelected={setSugSelected}/>
                    }

                </div>
              </div>

       }
       
       
       return ( render() )
}




export default SugTable;