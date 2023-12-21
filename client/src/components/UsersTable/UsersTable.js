import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"



import './UsersTable.css';
import ObjInfo from '../ObjInfo/ObjInfo';

import UserModal from '../UserModal/UserModal';
import { deleteUser } from '../../actions/users';



const UsersTable = ({ sugerencias }) => {
    
    const dispatch = useDispatch()
    
    const emptyUser = {
        name: '',
        mail:'',
        password: '',
        level: '' 
    }
    const [userModal, setUserModal] = useState(false)
    const [userSelected, setUserSelected] = useState(emptyUser)
    const [createUser, setCreateUser] = useState(false)

    const users = useSelector(state => state.users)
    
    console.log(users)

    useEffect(()=>{
        setUserSearch(users)
    }, [users])
    

    const [buscador, setBuscador] = useState()
    const [userSearch, setUserSearch] = useState([])


    useEffect(()=>{
        if (buscador != "") {
         var searchResult = []
            
         console.log(users)

         let newBuscador = buscador || '';
 
             for (let index = 0; index < users.length; index++) {
                 const element = users[index] || '';
                 var tieneName = false
                 if (element?.name?.toLowerCase().includes(newBuscador?.toLowerCase())) {
                    tieneName = true
                }

                var tieneMail = false
                 if (element?.mail?.toLowerCase().includes(newBuscador?.toLowerCase())) {
                     tieneMail = true
                 }
 
 
                 if (tieneName || tieneMail) {
                     // return element
                     searchResult.push(element);
 
                 }
                }
                console.log(searchResult)
             setUserSearch(searchResult)
        }else{
             setUserSearch(users)
        }


     }, [buscador])



  function render(){
      return  <div id="UsersTable-view">
                <div className="table-config">
                    <button onClick={()=>{ 
                        setUserModal(true)
                        setCreateUser(true)
                        setUserSelected(emptyUser)
                    }}>New User</button>
                    <input type="text" onChange={(e)=>{ setBuscador(e.target.value) }} value={buscador} placeholder="Buscar usuario" />
                </div>
                
                <div className='table'>
                    <div className='tr'>
                        <div>
                            <div className="id-cell th">Id</div>
                            <div className="user-name-cell th">Nombre</div>
                            <div className="user-mail-cell th">Mail</div>
                            <div className="th delete-cell"></div>
                        </div>
                    </div>
                    {userSearch.map((user, index)=>(

                        <div className='tr' onClick={()=>{
                            setUserModal(true)
                            setUserSelected(user)
                        }}>
                            <div>
                                <div className="id-cell td"><p>{index + 1}</p></div>
                                
                                <div className="user-name-cell td" title={user.name }><p>{user.name }</p></div>
                                
                                <div className="user-mail-cell td" title={ user.mail }><p>{ user.mail }</p></div>
                                
                              {/*  
                                <div className="cant-cell td">{ suge.rtas.length}</div>
                                
                                <div className="rtas-cell td">{suge.rtas.map((rta)=>(
                                        <p>{rta.nombre}</p>
                                    ))}
                                    {suge.rtas.length == 0 &&  <p><i>No sugirieron respuestas.</i></p>}    
                                </div>
                                <div className="tipo-cell td">{suge.type == 0 ? "Objeción" : 'Respuesta'}</div>
                             */}
                                <div className='delete-user delete-cell' onClick={(e)=>{
                                    e.stopPropagation()
                                    if (window.confirm(`Desea eliminar a ${user.name}`)) {
                                        
                                        deleteUser(user._id, dispatch).then(
                                        (e)=>{
                                            alert("Usuario eliminado con éxito!")
                                        }).catch( (e) =>{
                                            alert("Hubo un error al eliminar este usuario :(")
                                        } )
                                    }

                                    }}>DELETE</div>
                                
                            </div> 
                        </div>
                        ))
                    }
                </div>
                    
                { userModal &&
                        <UserModal user={userSelected} setUserModal={setUserModal} setCreateUser={setCreateUser} createUser={createUser}/>
                } 


              </div>

       }
       
       
       return ( render() )
}




export default UsersTable;
