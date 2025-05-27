import { Router } from 'express'
const router = Router()
import {createtask, login, cru, gettasks, deleteTask} from '../functions/funcoes.js'

//router.post('/cadastro', authController.cadastro);
router.post('/login', login)
router.post('/cru', cru)
router.post('/createtask', createtask)
router.get('/gettasks', gettasks)
router.delete('/deletetask/:texto', deleteTask)
//router.post('/nvsh',nvsh)
//router.post('/recs',recs)

export default router;