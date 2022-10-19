import express from 'express'
import { getUserFromToken } from '../auth.js'

import { login, createUser, getAllUsers, deleteUser, updateUser, isAdmin} from '../controllers/users.js'

const router = express.Router()
router.post('/login', login)
router.post('/isAdmin', isAdmin)
router.get('/verify', getUserFromToken)
router.post('/new', createUser)
router.get('/', getAllUsers)
router.delete('/:id', deleteUser)
router.patch('/', updateUser)


export default router