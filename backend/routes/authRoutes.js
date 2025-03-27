const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
//router.post('/cadastro', authController.cadastro);
router.post('/login', authController.login);
router.post('/cru', authController.cru);
router.post('/recs',authController.recs)
/*
// Rotas protegidas
router.get('/profile', authMiddleware, authController.getProfile);
*/
module.exports = router;