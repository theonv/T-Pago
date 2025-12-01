import { Router } from 'express'
import jwt from 'jsonwebtoken'
const router = Router()
import { authMiddleware } from '../middleware/authMiddleware.js'
import {
  validateBody,
  validateParams,
  registerSchema,
  loginSchema,
  createTaskSchema,
  updateTaskSchema,
  createListSchema,
  updateListSchema,
  idParamSchema,
  updateUserSchema
} from '../middleware/validate.js'
import {
  removeitem, toggleitem, additem, createtask,
  login, cru, gettasks, deleteTask, updatetask,
  createlist, getlists, deletelist, updatelist,
  updateemail, sendEmail, toggletask, refreshToken,
  resetPassword,modsenha
} from '../functions/funcoes.js'

const passwordResetMiddleware = (req, res, next) => {
  if (req.path === '/sendEmail') {
    return next();
  }

  const { resetToken } = req.body;
  
  if (!resetToken) {
    return res.status(401).json({ message: 'Token de reset não fornecido' });
  }

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    req.resetEmail = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token de reset inválido ou expirado' });
  }
};

router.post('/login', validateBody(loginSchema), login)           
router.post('/cru', validateBody(registerSchema), cru)            

router.post('/sendEmail', sendEmail)  
router.post('/resetPassword', passwordResetMiddleware, resetPassword)  
router.put('/modsenha', modsenha) //sem camisinha e mais gostoso

router.use(authMiddleware)  

router.post('/refresh-token', refreshToken)

router.put('/updateemail', validateBody(updateUserSchema), updateemail)

router.put('/toggletask/:id', validateParams(idParamSchema), toggletask)
router.post('/createtask', validateBody(createTaskSchema), createtask)
router.post('/gettasks', gettasks)
router.delete('/deletetask/:texto', deleteTask)
router.put('/updatetask', validateBody(updateTaskSchema), updatetask)

router.post('/createlist', validateBody(createListSchema), createlist)
router.post('/getlists', getlists)
router.delete('/deletelist/:nome', deletelist)
router.put('/updatelist', validateBody(updateListSchema), updatelist)
router.post('/additem', additem)
router.post('/toggleitem', toggleitem)
router.delete('/removeitem', removeitem)

export default router;