import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './Panel.css';
import Notifications from '../../components/Notificactions/Notifications';
import ObjTable from '../../components/ObjTable/ObjTable';


const Panel = ({setActiveTab }) => {

const objeciones = useSelector(state => state.objeciones)
  function render(){
      return  <div id="Panel-view">
                    <div>
                        <div id="tab-selection">
                            <ul>
                                <li className='selectedTab'>OBJECIONES</li>
                                <li>SUGERENCIAS</li>
                            </ul>
                        </div>
                        <div id="table-cont">
                            <ObjTable objeciones={objeciones} />

                        </div>

                    </div>
              </div>

       }
       
       
       return ( render() )
}




export default Panel;