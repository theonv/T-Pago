const User = require('../models/User');
const enviar = require('../lib/email')

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
  const userData = {
    email: req.body.email,
    senha: req.body.senha,
  }
  const user = await User.create(userData)

  res.send(user)
}
exports.recs = async (req,res) => {
  try {
    const email = req.body.email
    const user = await User.findOne({ email: email })
    console.debug(req.body.email,user)
    const link = "http://127.0.0.1:5500/projeto/P%C3%A1ginas/rec.html"
    if (!user) {
      throw 'Usuário não encontrado'
    }
    await enviar(
      "lucasfrancelinopontes@gmail.com",
      "Recuperar senha",
      `Deu red ne, mas tudo bem clique aqui para mudar sua senha: ${link}`,
      `
        <h1>Pediu nova senha?</h1>
        <a href='${link}'>Clica aqui</a>
    `
    )
    return Response.json({
      mensagem: "O usuário receberá um e-mail com as instruções de login"
    })
  } catch (error) {
    console.log("Erro não deu pai", error)
    return Response.json({
      error: error
    },
      { status: 400 }
    )
  }

}
exports.nvsh = async (req,res) => {
  try {
    const senha = req.body.senha
    const email = "admin@gmail.com"
    const user =  await User.findOne({ email: email })
    console.debug(senha)
    const link = "http://127.0.0.1:5500/projeto/P%C3%A1ginas/index.html"
    if (!user) {
      throw 'Usuário não encontrado'
    }
    await enviar(
      "lucasfrancelinopontes@gmail.com",
      "Recuperar senha",
      `Deu Green voce mudou sua senha acesse para fazer login: ${link}`,
      `
        <h1>Deu green Acesse!</h1>
        <a href='${link}'>Clica aqui</a>
    `
    )
    const userData = {
      email: email,
      senha: senha,
    }
    console.log(userData)
    user.save(userData)
    console.log("cade?")
    return Response.json({
      mensagem: "O usuário receberá um e-mail com as instruções de login"
    })
  } catch (error) {
    console.log("Erro não deu pai", error)
    return Response.json({
      error: error
    },
      { status: 400 }
    )
  }

}