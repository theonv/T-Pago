import { Router } from 'express'
const router = Router()
import {createtask, login, cru, gettasks, deleteTask, updatetask, createlist, getlists, deletelist, updatelist, updateemail, sendEmail, toggletask} from '../functions/funcoes.js'

//router.post('/cadastro', authController.cadastro);
router.post('/login', login)
router.post('/cru', cru)
router.put('/updateemail', updateemail)
router.put('/toggletask/:id', toggletask)
router.post('/createtask', createtask)
router.post('/gettasks', gettasks)
router.delete('/deletetask/:texto', deleteTask)
router.put('/updatetask',updatetask)
router.post('/createlist', createlist)
router.post('/getlists', getlists)
router.delete('/deletelist/:nome', deletelist)
router.put('/updatelist', updatelist)
//router.post('/nvsh',nvsh)
//router.post('/recs',recs)
router.post('/sendEmail', sendEmail);

export default router;