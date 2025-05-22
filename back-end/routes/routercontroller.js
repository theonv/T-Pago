import { Router } from 'express'
const router = Router()
import { login, cru, nvsh, recs } from '../functions/funcoes.js'

//router.post('/cadastro', authController.cadastro);
router.post('/login', login)
router.post('/cru', cru)
//router.post('/nvsh',nvsh)
//router.post('/recs',recs)

export default router;