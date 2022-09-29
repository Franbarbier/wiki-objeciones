import React, { useEffect } from 'react';
import './ModalContainer.css'

const ModalContainer = ({children, tipo, closeModal=null}) => {

    useEffect(()=>{
        var window = document.getElementById('modal-container-'+tipo)
        setTimeout(() => {
            window.classList.remove('close-modal')
        }, 10);
    }, [])

    return(
            <div  id={"modal-container-"+tipo} className="close-modal modal-container" onClick={closeModal}>
                <div  onClick={(e)=>{e.stopPropagation()}} >
                    
                    {children}
                </div>
            </div>
    )
}

export default ModalContainer