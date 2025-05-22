const User = require('../models/usuario.js')

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    console.log(email, senha)
    console.log(user.senha)
    if (!user) {
      console.error('Erro ao realizar login email:');
      res.status(500).json({ message: 'usuario não encontrado', error: error.message });
    }
    if (user.senha != senha) {
      console.error('Erro ao realizar login senha:');
      res.status(500).json({ message: 'senha errada papai', error: error.message });
    }
    res.status(200).json({
      message: 'Login realizado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao realizar login F:');
    res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
  }
};

exports.cru = async (req, res) => {
  console.log("req.body:", req.body);
  const userData = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
  }
  const user = await User.create(userData)

  res.send(user)
}