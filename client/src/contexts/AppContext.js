import React, {useState, useMemo, useEffect, useRef} from 'react';

import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import { getObjeciones } from '../actions/objeciones';
import { getSugerencias } from '../actions/sugerencias';


const AppContext = React.createContext();

export function AppProvider(props){
    
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    
    const [loadingObjeciones, setLoadingObjeciones] = useState(false)
    const [loadingSugerencias, setLoadingSugerencias] = useState(false)
    
    const [notifications, setNotifications] = useState([])
    
    const setters = [setLoadingObjeciones, setLoadingSugerencias]

    
    useEffect(()=>{
        setNotifications([])
    }, [pathname])


    useEffect(()=>{
        setAllLoading()
        if(!window.location.href.includes('login')){
            setAllLoading(true)
            dispatch(getObjeciones()).then(()=>setLoadingObjeciones(false))        
            dispatch(getSugerencias()).then(()=>setLoadingSugerencias(false))     
        }
    }, [pathname])

    function setAllLoading(){
        for(let setter of setters){
            setter(true)
        }
    }

    const value = useMemo(()=>{
        return ({
            loading: {objeciones: loadingObjeciones, sugerencias: loadingSugerencias},
            notifications,
            setNotifications
        })
    }, [loadingObjeciones, notifications, loadingSugerencias])

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