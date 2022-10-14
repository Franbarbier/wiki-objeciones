import React, {useState, useMemo, useEffect, useRef} from 'react';

import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import { getObjeciones } from '../actions/objeciones';
import { getSugerencias } from '../actions/sugerencias';
import { getRespuestas } from '../actions/respuestas';
import { getUsers } from '../actions/users';


const AppContext = React.createContext();

export function AppProvider(props){
    
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    
    const [loadingObjeciones, setLoadingObjeciones] = useState(false)
    const [loadingSugerencias, setLoadingSugerencias] = useState(false)
    const [loadingRespuestas, setLoadingRespuestas] = useState(false)
    const [loadingUsers, setLoadingUsers] = useState(false)
    
    const [notifications, setNotifications] = useState([])
    
    const setters = [setLoadingObjeciones, setLoadingSugerencias, setLoadingRespuestas, setLoadingUsers]

    
    useEffect(()=>{
        setNotifications([])
    }, [pathname])


    useEffect(()=>{
        setAllLoading()
        if(!window.location.href.includes('login')){
            setAllLoading(true)
            dispatch(getObjeciones()).then(()=>setLoadingObjeciones(false))        
            dispatch(getSugerencias()).then(()=>setLoadingSugerencias(false))  
            dispatch(getRespuestas()).then(()=>setLoadingRespuestas(false))
            dispatch(getUsers()).then(()=>setLoadingUsers(false))
        }
    }, [pathname])

    function setAllLoading(){
        for(let setter of setters){
            setter(true)
        }
    }

    const value = useMemo(()=>{
        return ({
            loading: {objeciones: loadingObjeciones, sugerencias: loadingSugerencias, respuestas: loadingRespuestas, users: loadingUsers},
            notifications,
            setNotifications
        })
    }, [loadingObjeciones, notifications, loadingSugerencias, loadingRespuestas, loadingUsers])

    // console.log(value)

    return <AppContext.Provider value={value} {...props} />

}

export function useAppContext(){
    const context = React.useContext(AppContext)
    if(!context){
        throw new Error("useAppContext must be inside AppContext provider")
    }
    return context;
}