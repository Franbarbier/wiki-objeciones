import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './Notifications.css';





const Notifications = ({ objecion, setOpenNotifications }) => {
    

    console.log(objecion)
    document.addEventListener( "click",
        function(event) {
          // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
          if (!event.target.closest("#notifications")  ) {
            setOpenNotifications(false)
          }
        },
        false
      )


  function render(){
      return  <div id="Notifications-view">
                    <ul>
                        <li>No tienes notificaciones :)</li>
                    </ul>
              </div>

       }
       
       
       return ( render() )
}




export default Notifications;