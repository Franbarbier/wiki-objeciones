import axios from 'axios';

// // Obtenemos el token del localStorage
// const token = window.localStorage.getItem('token');

// const headers = {
//     'Authorization': `Bearer ${token}`
// }
const headers = ''

// const ENDPOINT = 'http://localhost:5000/';
const ENDPOINT = 'https://wiki-objs.herokuapp.com/';


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

