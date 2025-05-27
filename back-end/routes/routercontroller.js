import { Router } from 'express'
const router = Router()
import {createtask, login, cru, gettasks} from '../functions/funcoes.js'

//router.post('/cadastro', authController.cadastro);
router.post('/login', login)
router.post('/cru', cru)
router.post('/createtask', createtask)
router.get('/gettasks', gettasks)
//router.post('/nvsh',nvsh)
//router.post('/recs',recs)

export default router;