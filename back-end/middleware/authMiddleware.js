import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Token não fornecido',
        message: 'Acesso negado. Token de autenticação não encontrado.' 
      });
    }
    const parts = authHeader.split(' ');
    
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ 
        error: 'Formato de token inválido',
        message: 'O token deve estar no formato: Bearer [token]' 
      });
    }

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.userId = decoded.id || decoded.userId;
    req.userEmail = decoded.email;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Token inválido',
        message: 'O token fornecido é inválido.' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expirado',
        message: 'Sua sessão expirou. Por favor, faça login novamente.' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Erro na autenticação',
      message: 'Erro ao processar o token de autenticação.' 
    });
  }
};