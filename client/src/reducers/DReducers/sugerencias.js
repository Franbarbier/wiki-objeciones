export default (state=[], action) => {

    switch(action.type){

        case 'FETCH_ALL_SUGERENCIAS':
            return action.payload;


        case 'CREATE_SUGERENCIA':
            return [action.payload, ...state];
            // const response = action.payload
            // console.log(response)
            // if(response.error == 0){
            //     // window.localStorage.setItem('token', response.token)
            //     // window.localStorage.setItem('user', JSON.stringify(response.user))
            //     // window.location = "/"
            // }
            // return {...state, login:response}
        case 'UPDATE_SUGERENCIA':
            return state.map(sugerencia => {
                if (sugerencia._id !== action.payload._id) {
                    return sugerencia
                }else{
                    return action.payload
                }})
    

        case 'DELETE_SUGERENCIA':
            var id_deleted = action.payload.id
            console.log(id_deleted)
            return state.filter((sug)=> sug._id != id_deleted);

        default:
            return state;
    }

}