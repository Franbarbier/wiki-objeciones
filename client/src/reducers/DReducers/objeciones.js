export default (state=[], action) => {

    switch(action.type){

        case 'FETCH_ALL_OBJECIONES':
            return action.payload;


        case 'CREATE_OBJECION':
            const response = action.payload
            console.log(response)
            // if(response.error == 0){
            //     // window.localStorage.setItem('token', response.token)
            //     // window.localStorage.setItem('user', JSON.stringify(response.user))
            //     // window.location = "/"
            // }
            // return {...state, login:response}
        break;
        case 'DELETE_OBJECION':
            var id_deleted = action.payload.id
            console.log(id_deleted)
            return state.filter((obj)=> obj._id != id_deleted);

        default:
            return state;
    }

}