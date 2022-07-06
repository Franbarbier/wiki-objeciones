import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from './ScrollToTop';

import Home from './views/Home/Home'

import { AppProvider } from './contexts/AppContext';

 import './css-gral.css';
import Panel from './views/Panel/Panel';


// import { verifyUser } from './api';

const App = () => {


  const [activeTab, setActiveTab] = useState('home')
  const [user, setUser] = useState({})

  useEffect(()=>{
    // verifyUser().then((res)=>setUser(res))
  }, [])

  // useEffect(()=>{
  //   console.log(user)
  // })


  function render(){
    return (
      <>

      {/* { !user.mail ?
        <Login setUser={setUser} />
      : */}
        <Router>
          <AppProvider>
          <ScrollToTop/>
            <Routes>
                <Route exact path="/" element={<Home setActiveTab={setActiveTab} />}/>
                <Route exact path="/admin-panel" element={<Panel /> }/>
               
            </Routes>
            </AppProvider>
        </Router>
        {/* } */}
      </>
    );
  }

  return (
    render()        
  )

}

export default App;