import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './Panel.css';
import Notifications from '../../components/Notificactions/Notifications';
import ObjTable from '../../components/ObjTable/ObjTable';
import SugTable from '../../components/SugTable/SugTable';


const Panel = ({setActiveTab }) => {


const [panelInfo, setPanelInfo] = useState("objeciones")
const objeciones = useSelector(state => state.objeciones)
const sugerencias = useSelector(state => state.sugerencias)

console.log(sugerencias)

  function render(){
      return  <div id="Panel-view">
                    <div>
                        <div id="tab-selection">
                            <ul>
                                <li onClick={ ()=>{setPanelInfo("objeciones")} } className={ panelInfo == "objeciones" && 'selectedTab'} >OBJECIONES</li>
                                <li onClick={ ()=>{setPanelInfo("sugerencias")} } className={ panelInfo == "sugerencias" && 'selectedTab'} >SUGERENCIAS</li>
                            </ul>
                        </div>
                        <div id="table-cont">
                            {panelInfo == "objeciones" ?

                                <ObjTable objeciones={objeciones}/>
                            :
                                <SugTable sugerencias={sugerencias} />
                            }

                        </div>

                    </div>
              </div>

       }
       
       
       return ( render() )
}




export default Panel;