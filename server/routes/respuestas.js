import express from 'express'

import { createRespuesta, getRespuestas, updateRespuesta, deleteRespuesta} from '../controllers/respuestas.js'


const router = express.Router()
// router.get('/saldo/:id', getSaldoPlataforma)
// router.get('/ordenes/:id', (req, res) => getOrdenesPlataforma(req, res, false))
router.get('/', getRespuestas)
router.post('/', createRespuesta)
router.delete('/:id', deleteRespuesta)
router.patch('/', updateRespuesta)


export default router