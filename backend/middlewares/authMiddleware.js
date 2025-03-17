const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Verificar o cabeçalho de autorização
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Obter o token do cabeçalho
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Verificar a validade do token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta_jwt');
    
    // Verificar se o usuário existe
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Adicionar ID do usuário à requisição
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Erro de autenticação:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;