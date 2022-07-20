import express from 'express'

import { createSugerencia, getSugerencias, updateSugerencia, deleteSugerencia} from '../controllers/sugerencias.js'


const router = express.Router()
// router.get('/saldo/:id', getSaldoPlataforma)
// router.get('/ordenes/:id', (req, res) => getOrdenesPlataforma(req, res, false))
router.get('/', getSugerencias)
router.post('/', createSugerencia)
router.delete('/:id', deleteSugerencia)
// router.patch('/', updateObjecion)

export default router