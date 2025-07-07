import { Router } from 'express'
const router = Router()
import {createtask, login, cru, gettasks, deleteTask, createlist, getlists, deletelist} from '../functions/funcoes.js'

//router.post('/cadastro', authController.cadastro);
router.post('/login', login)
router.post('/cru', cru)
router.post('/createtask', createtask)
router.post('/gettasks', gettasks)
router.delete('/deletetask/:texto', deleteTask)
router.post('/createlist', createlist)
router.get('/getlists', getlists)
router.delete('/deletelist/:nome', deletelist)
//router.post('/nvsh',nvsh)
//router.post('/recs',recs)

export default router;