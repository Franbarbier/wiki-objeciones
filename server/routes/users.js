import express from 'express'
// import { getUserFromToken } from '../auth.js'

import { login, createUser, getAllUsers, deleteUser} from '../controllers/users.js'

const router = express.Router()
router.post('/login', login)
// router.get('/verify', getUserFromToken)
router.post('/new', createUser)
router.get('/', getAllUsers)
router.delete('/:id', deleteUser)


export default router