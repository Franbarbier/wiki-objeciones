import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './UserModal.css';
import { createNewUser } from '../../actions/users';
import ModalContainer from '../ModalContainer/ModalContainer';





const UserModal = ({ user, setUserModal, createUser, setCreateUser}) => {
    

  const dispatch = useDispatch()


    const [nombre, setNombre] = useState(user.name)
    const [mail, setMail] = useState(user.mail)
    const [password, setPassword] = useState(user.password)
    const [passwordBis, setPasswordBis] = useState(user.password)

  
 
    function handleCreateNewUser() {
        console.log(
            {mail,
            name: nombre,
            password}
        )

        createNewUser({mail, name: nombre, password}, dispatch).then(
            (e)=> 
              console.log(e)
            ).catch( (e) =>{
              console.log('error:::', e.error)
              alert('Hubo un error, por favor intentalo de nuevo.')
          } )
    }

  function render(){
      return  (

        <ModalContainer tipo="userModal" closeModal={ ()=>{
                                        setUserModal(false)
                                        setCreateUser(false)
                                    } }>
            <div id="UserModal-view">
                <div id="UserModal" onClick={(e)=>{e.stopPropagation()}}>
                    <div>
                        {createUser ?
                            <h3>Crear nuevo usuario</h3>
                        :
                            <h3>Editar usuario</h3>
                        }
                    </div>
                    <br />
                    <div>
                        <label>Nombre</label>
                        <input type="text" value={nombre} onChange={ (e)=>{ setNombre(e.target.value) } }/>
                    </div>
                    <div>
                        <label>Mail</label>
                        <input type="email" value={mail} onChange={ (e)=>{ setMail(e.target.value) } }/>
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input type="password" value={password} onChange={ (e)=>{ setPassword(e.target.value) } }/>
                    </div>
                    <div>
                        <label>Repetir contraseña</label>
                        <input type="password" value={passwordBis} onChange={ (e)=>{ setPasswordBis(e.target.value) } }/>
                    </div>
                    <br />
                    <div>
                        {createUser ?
                            <button onClick={ ()=>{ handleCreateNewUser() } }>Crear usuario</button>
                        :
                            <button>Guardar cambios</button>
                        }
                        <button>Descartar cambios</button>
                    </div>
                </div>             
              </div>
        </ModalContainer>

            )

       }
       
       
       return ( render() )
}




export default UserModal;