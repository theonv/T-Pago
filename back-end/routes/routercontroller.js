import { Router } from 'express'
import jwt from 'jsonwebtoken'
const router = Router()
import { authMiddleware } from '../middleware/authMiddleware.js'
import {
  removeitem, toggleitem, additem, createtask,
  login, cru, gettasks, deleteTask, updatetask,
  createlist, getlists, deletelist, updatelist,
  updateemail, sendEmail, toggletask, refreshToken,
  resetPassword
} from '../functions/funcoes.js'

/**
 * ============================================================================
 * MIDDLEWARE DE AUTENTICAÇÃO JWT
 * ============================================================================
 * Todas as rotas abaixo do router.use(authMiddleware) são protegidas e 
 * requerem um token JWT válido no header Authorization: Bearer <token>
 * ============================================================================
 */

// Middleware para verificar token em rotas de recuperação de senha
const passwordResetMiddleware = (req, res, next) => {
  // Para a rota de envio de email, permite passar sem verificação
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

// ============================================================================
// ROTAS PÚBLICAS (não precisam de autenticação)
// ============================================================================
router.post('/login', login)           // Login de usuário
router.post('/cru', cru)               // Cadastro de novo usuário

// ============================================================================
// ROTAS DE RECUPERAÇÃO DE SENHA (parcialmente protegidas)
// ============================================================================
router.post('/sendEmail', sendEmail)  // Envio de email para reset de senha
router.post('/resetPassword', passwordResetMiddleware, resetPassword)  // Reset de senha com token

// ============================================================================
// TODAS AS ROTAS ABAIXO ESTÃO PROTEGIDAS POR JWT
// Requerem header: Authorization: Bearer <token>
// ============================================================================
router.use(authMiddleware)  // Aplica proteção JWT em todas as rotas abaixo

// Rota de refresh token
router.post('/refresh-token', refreshToken)

// Rotas de usuário
router.put('/updateemail', updateemail)

// Rotas de tarefas
router.put('/toggletask/:id', toggletask)
router.post('/createtask', createtask)
router.post('/gettasks', gettasks)
router.delete('/deletetask/:texto', deleteTask)
router.put('/updatetask', updatetask)

// Rotas de listas
router.post('/createlist', createlist)
router.post('/getlists', getlists)
router.delete('/deletelist/:nome', deletelist)
router.put('/updatelist', updatelist)
router.post('/additem', additem)
router.post('/toggleitem', toggleitem)
router.delete('/removeitem', removeitem)

export default router;