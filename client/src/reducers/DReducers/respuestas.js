export default (state=[], action) => {

    switch(action.type){

        case 'FETCH_ALL_RESPUESTAS':
            return action.payload;


        case 'CREATE_RESPUESTA':
            console.log("compa rock", action.payload.newRta)
            console.log(state)
            return [...state, action.payload.newRta];
            // const response = action.payload
            // console.log(response)
            // if(response.error == 0){
            //     // window.localStorage.setItem('token', response.token)
            //     // window.localStorage.setItem('user', JSON.stringify(response.user))
            //     // window.location = "/"
            // }
            // return {...state, login:response}
        case 'UPDATE_RESPUESTA':
            return state.map(respuesta => {
                if (respuesta._id !== action.payload._id) {
                    return respuesta
                }else{
                    return action.payload
                }})
    

        case 'DELETE_RESPUESTA':
            var id_deleted = action.payload.id
            console.log(id_deleted)
            return state.filter((obj)=> obj._id != id_deleted);

        default:
            return state;
    }

}