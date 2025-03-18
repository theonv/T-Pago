const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registrar novo usuário
exports.cadastro = async (req, res) => {
  try {
    const { nome, email, senha, data_cadastro } = req.body;

    // Verificar se o usuário já existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    // Criar novo usuário
    const user = await User.create({
      nome,
      email,
      senha,
      data_cadastro,
    });

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id_usuario, email: user.email },
      process.env.JWT_SECRET || 'sua_chave_secreta_jwt',
      { expiresIn: process.env.JWT_EXPIRATION || '1d' }
    );

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      token,
      user: {
        id: user.id_usuario,
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  console.log("vaca")
  try {
    const { email, senha } = req.body;
    console.log(email,senha)
    console.log(req.body)
    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await user.checkPassword(senha);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id_usuario, email: user.email },
      process.env.JWT_SECRET || 'sua_chave_secreta_jwt',
      { expiresIn: process.env.JWT_EXPIRATION || '1d' }
    );

    res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id_usuario,
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
  }
};

// Obter informações do usuário logado
exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['senha'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    res.status(500).json({ message: 'Erro ao obter perfil', error: error.message });
  }
};