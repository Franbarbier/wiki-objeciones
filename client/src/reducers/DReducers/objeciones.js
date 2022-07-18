export default (state=[], action) => {

    switch(action.type){

        case 'FETCH_ALL_OBJECIONES':
            return action.payload;


        case 'CREATE_OBJECION':
            return [action.payload.newObj, ...state];
            // const response = action.payload
            // console.log(response)
            // if(response.error == 0){
            //     // window.localStorage.setItem('token', response.token)
            //     // window.localStorage.setItem('user', JSON.stringify(response.user))
            //     // window.location = "/"
            // }
            // return {...state, login:response}
        case 'UPDATE_OBJECION':
            return state.map(objecion => {
                if (objecion._id !== action.payload._id) {
                    return objecion
                }else{
                    return action.payload
                }})
    

        case 'DELETE_OBJECION':
            var id_deleted = action.payload.id
            console.log(id_deleted)
            return state.filter((obj)=> obj._id != id_deleted);

        default:
            return state;
    }

}