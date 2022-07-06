import express from 'express'

import { createObjecion, getObjeciones, updateObjecion, deleteObjecion} from '../controllers/objeciones.js'


const router = express.Router()
// router.get('/saldo/:id', getSaldoPlataforma)
// router.get('/ordenes/:id', (req, res) => getOrdenesPlataforma(req, res, false))
router.get('/', getObjeciones)
router.post('/', createObjecion)
router.delete('/:id', deleteObjecion)
// router.patch('/', updatePlataforma)

export default router