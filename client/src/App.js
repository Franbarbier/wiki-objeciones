import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from './ScrollToTop';
import {useDispatch} from 'react-redux';
import Home from './views/Home/Home'

import { AppProvider } from './contexts/AppContext';

 import './css-gral.css';
import Panel from './views/Panel/Panel';

import {isAdmin} from './actions/users';

import { verifyUser } from './api';
import Login from './views/Login/Login';

const App = () => {


  const [activeTab, setActiveTab] = useState('home')
  const [user, setUser] = useState({})

  useEffect(()=>{
    verifyUser().then((res)=>setUser(res))
  }, [])

  const dispatch = useDispatch()


 

  function render(){
    return (
      <>

      
        <Router>
          <AppProvider>
          <ScrollToTop/>
            <Routes>
                  <Route exact path="/" element={
                    !user.mail ?
                        <Login setUser={setUser} />
                    :
                      <Home setActiveTab={setActiveTab} />
                    }
                  />
                    

                  <Route exact path="/admin-panel" element={
                      !user.mail ?
                      <Login setUser={setUser} />
                      :
                        <Panel setActiveTab={setActiveTab} user={user}/>
                      }
                  />
                

                {/* <Route exact path="/admin-panel" render={() => <Panel />} /> */}
                {/* <Route exact path="/admin-panel">
                    <Panel setActiveTab={setActiveTab} />
                </Route> */}

               
            </Routes>
            </AppProvider>
        </Router>
       
      </>
    );
  }

  return (
    render()        
  )

}

export default App;