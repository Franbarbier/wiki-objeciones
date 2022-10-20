import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './Panel.css';
import Notifications from '../../components/Notificactions/Notifications';
import ObjTable from '../../components/ObjTable/ObjTable';
import SugTable from '../../components/SugTable/SugTable';
import UsersTable from '../../components/UsersTable/UsersTable';
import { isAdmin } from '../../actions/users';



const PanelAccess = ({ panelInfo, setPanelInfo, objeciones, sugerencias}) =>{
    return(
        <div>
            <div id="tab-selection">
                <ul>
                    <li onClick={ ()=>{setPanelInfo("objeciones")} } className={ panelInfo == "objeciones" && 'selectedTab'} >OBJECIONES</li>
                    <li onClick={ ()=>{setPanelInfo("sugerencias")} } className={ panelInfo == "sugerencias" && 'selectedTab'} >SUGERENCIAS</li>
                    <li onClick={ ()=>{setPanelInfo("usuarios")} } className={ panelInfo == "usuarios" && 'selectedTab'} >USUARIOS</li>
                </ul>
            </div>
            <div id="table-cont">
                {panelInfo == "objeciones" && <ObjTable objeciones={objeciones}/> }
                {panelInfo == "sugerencias" && <SugTable sugerencias={sugerencias} /> }
                {panelInfo == "usuarios" && <UsersTable /> }

            </div>

        </div>
    )
}
const Panel = ({setActiveTab, user }) => {


const [panelInfo, setPanelInfo] = useState("objeciones")
const [access, setAccess] = useState(false)
const objeciones = useSelector(state => state.objeciones)
const sugerencias = useSelector(state => state.sugerencias)
const dispatch = useDispatch()

useEffect(()=>{
    
        dispatch(isAdmin(user)).then(
          (e)=>{
              console.log(e)
              setAccess(e.error)
          }).catch( (e) =>{
              alert("No tienes los permisos requeridos para acceder.")
          } )
      
}, [])


console.log(access)

  function render(){
      return  <div id="Panel-view">
                        {access == 0 && <PanelAccess panelInfo={panelInfo} setPanelInfo={setPanelInfo} objeciones={objeciones} sugerencias={sugerencias} /> }
                        {access == 1 && <Navigate to="/" /> }
              </div>

       }
       
       
       return ( render() )
}




export default Panel;