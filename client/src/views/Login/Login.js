import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import { Redirect } from "react-router-dom";
import {login} from '../../actions/users';
import './Login.css';


const Login = () => {

 
  const dispatch = useDispatch()

  const [username, setUsername] = useState('mailo@mail.com')
  const [password, setPassword] = useState('contracontra')




   function handleLogin(e){

      e.preventDefault()
      dispatch(login({username, password})).then(
        (e)=>{
            localStorage.setItem('token', e.token)
            localStorage.setItem('user', e.user.name)
            localStorage.setItem('mail', e.user.mail)
            window.location.reload()
        }).catch( (e) =>{
            alert("Mail o contraseña son incorrectos.")
        } )
  
  }
    


  function render(){
      return  <div id="Login-view">
                <div>
                  <h4>WIKI OBJECIONES</h4>
                  <form onSubmit={(e)=>handleLogin(e)}>
                      <div>
                          {/* <label>Username</label> */}
                          <input placeholder="Mail" onChange={ (e)=>{ setUsername(e.target.value) } } value={username} type="text" />
                      </div>
                      <div>
                          {/* <label>Password</label> */}
                          <input placeholder="Password" onChange={ (e)=>{ setPassword(e.target.value) } } value={[password]} type="password" />
                      </div>
                      <button>Ingresar</button>
                  </form>
                </div>
              </div>

       }
       
       
       return ( render() )
}




export default Login;