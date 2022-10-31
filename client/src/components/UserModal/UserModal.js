import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

import './UserModal.css';
import { createNewUser, updateUser } from '../../actions/users';
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
            (e)=> {
                alert('Usuario creado con éxito!')
                setUserModal(false)
                setCreateUser(false)
            }).catch( (e) =>{
              console.log('error:::', e.error)
              alert('Hubo un error, por favor intentalo de nuevo.')
          } )
    }

    function handleEditUser() {
        updateUser({mail, name: nombre, password}, user._id, dispatch).then(
            (e)=> {
                alert('Cambios guardados con éxito!')
                setUserModal(false)
                setCreateUser(false)
            }).catch( (e) =>{
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
                    <section>
                        <div className="inputs-cont">
                            <label>Nombre</label>
                            <input type="text" value={nombre} onChange={ (e)=>{ setNombre(e.target.value) } }/>
                        </div>
                        <div className="inputs-cont">
                            <label>Mail</label>
                            <input type="email" value={mail} onChange={ (e)=>{ setMail(e.target.value) } }/>
                        </div>
                        <div className="inputs-cont">
                            <label>Contraseña</label>
                            <input type="password" value={password} onChange={ (e)=>{ setPassword(e.target.value) } }/>
                        </div>
                        <div className="inputs-cont">
                            <label>Repetir contraseña</label>
                            <input type="password" value={passwordBis} onChange={ (e)=>{ setPasswordBis(e.target.value) } }/>
                        </div>
                    </section>

                    <div>
                        {createUser ?
                            <button className='save-user-change' onClick={ ()=>{ handleCreateNewUser() } }>Crear usuario</button>
                        :
                            <button className='save-user-change' onClick={ ()=>{ handleEditUser() } }>Guardar cambios</button>
                        }
                        <button className='discard-user-change' onClick={ ()=>{
                                        setUserModal(false)
                                        setCreateUser(false)
                                    } }>Descartar cambios</button>
                    </div>
                </div>             
              </div>
        </ModalContainer>

            )

       }
       
       
       return ( render() )
}




export default UserModal;