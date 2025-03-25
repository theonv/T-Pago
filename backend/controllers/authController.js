const User = require('../models/User');

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    console.log(email,senha)

    res.status(200).json({
      message: 'Login realizado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
  }
};

exports.cru = async (req, res) => {
  console.debug(req.body)
  const user = await User.create({
    email: req.body.email,
    senha: req.body.senha,
  })

  res.send(user)
}