import axios from 'axios';

// // Obtenemos el token del localStorage
const token = window.localStorage.getItem('token');

const headers = {
    'Authorization': `Bearer ${token}`
}
// const headers = ''

// const ENDPOINT = 'http://localhost:5000/';
const ENDPOINT = 'https://wikiback-5auuyy00h-franbarbier.vercel.app/';

const url_users = ENDPOINT+'users'
// export const createUser = (user) => axios.post(`${url_users}/new`, user );
export const createUser = () => axios.get(url_users, {...filtros, headers});
export const deleteUser = (id) => axios.delete(`${url_users}/${id}`, {headers});
export const updateUser = (updateData) => axios.patch(`${url_users}`, updateData, {headers});
export const login = (user) => axios.post(`${url_users}/login`, user );
export const isAdmin = (user) => axios.post(`${url_users}/isAdmin`, user );

export const verifyUser = async (id) => {
    console.log(token)
    var res = await fetch(`${url_users}/verify`, {method: 'GET', headers})
    .then(response => response.json())
    .then(data => data);
    console.log(res)
    return res
}

const url_objeciones = ENDPOINT+'objeciones'
export const getObjeciones = (filtros) => axios.get(url_objeciones, {...filtros, headers});
export const createObjecion = (objecion) => axios.post(url_objeciones, objecion );
export const deleteObjeciones = (id) => axios.delete(`${url_objeciones}/${id}`, {headers});
export const updateObjecion = (objecion) => axios.patch(`${url_objeciones}/`, objecion, {headers});
// export const getOrdenesCliente = (id_cliente) => axios.get(`${url_clientes}/ordenes/${id_cliente}`, {headers});


const url_sugerencias = ENDPOINT+'sugerencias'
export const getSugerencias = (filtros) => axios.get(url_sugerencias, {...filtros, headers});
export const createSugerencia = (sugerencia) => axios.post(url_sugerencias, sugerencia );
export const deleteSugerencias = (id) => axios.delete(`${url_sugerencias}/${id}`, {headers});
// export const updateObjecion = (objecion) => axios.patch(`${url_objeciones}/`, objecion, {headers});

const url_respuestas = ENDPOINT+'respuestas'
export const getRespuestas = (filtros) => axios.get(url_respuestas, {...filtros, headers});
export const createRespuesta = (respuesta) => axios.post(url_respuestas, respuesta );
export const deleteRespuestas = (id) => axios.delete(`${url_respuestas}/${id}`, {headers});
export const updateRespuesta = (respuesta) => axios.patch(`${url_respuestas}/`, respuesta, {headers});


