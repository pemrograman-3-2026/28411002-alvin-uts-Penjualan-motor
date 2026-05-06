import express from 'express'
import { getAll, getByUser, getById, create, updateStatus } from '../controllers/transaction.controller.js'

const router = express.Router()
router.get('/', getAll)
router.get('/user/:id_user', getByUser)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', updateStatus)
export default router
