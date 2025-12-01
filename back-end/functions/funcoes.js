import User from '../models/usuario.js';
import Task from '../models/task.js';
import List from '../models/lists.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error('Erro ao realizar login email:');
      return res.status(500).json({ message: 'usuario não encontrado' });
    }
    console.log(user.senha);
    const senhaValida = await bcrypt.compare(senha, user.senha);
    console.log("Senha válida:", senhaValida);
    if (!senhaValida) {
      console.error('Erro ao realizar login senha:');
      return res.status(500).json({ message: 'senha errada papai' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log(token);
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erro ao realizar login F:', error);
    res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
  }
};

export const cru = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    const userData = {
      email: req.body.email,
      senha: req.body.senha,
    };
    const user = await User.create(userData);
    console.log("Usuário criado:", user);
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const newToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token: newToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export const updateemail = async (req, res) => {
  try {
    const { email, id } = req.body;
    console.log("Novo email:", email)
    const updatedUser = await User.update(
      { email: email },
      { where: { id: id } }
    );
    console.log("Usuário atualizado:", updatedUser);
    if (updatedUser[0] > 0) {
      res.status(200).json({ message: 'Email atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar email', error: error.message });
  }
};


// tarefas
export const createtask = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    const taskData = {
      descricao: req.body.descricao,
      FK_USUARIO_id: req.body.FK_USUARIO_id
    };
    const task = await Task.create(taskData);
    console.log("Tarefa eu sou foda criada:", task);
    res.send(task);
  } catch (error) {
    console.log("Erro foda ao criar tarefa:", error);
    res.status(500).json({ message: 'Erro ao criar tarefa', error: error.message });

  }
}
export const gettasks = async (req, res) => {
  try {
    const { FK_USUARIO_id } = req.body;
    if (!FK_USUARIO_id) {
      return res.status(400).json({ message: 'usuarioId é obrigatório' });
    }
    const tasks = await Task.findAll({ where: { FK_USUARIO_id } });
    console.log("Tarefas encontradas:", tasks);
    console.log("id das tarefas:", tasks.map(task => task.id));
    console.log("Texto das tarefas:", tasks.map(task => task.descricao));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', error: error.message });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const id = req.body.id;
    console.log("Nome da tarefa a ser deletada:", req.body.descricao); // Corrigido para usar descricao
    console.log("Id da tarefa a ser deletada:", id);
    const deletedTask = await Task.destroy({ where: { id: id } });

    if (deletedTask) {
      res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar tarefa', error: error.message });
  }
};

export const updatetask = async (req, res) => {
  try {
    const { id, descricao } = req.body;
    console.log("Id da tarefa a ser atualizada:", id);
    console.log("Novo nome da tarefa:", descricao);

    const updatedTask = await Task.update({ descricao: descricao }, { where: { id: id } });

    if (updatedTask[0] > 0) {
      res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar Tarefa', error: error.message });
  }
}



// listas
export const createlist = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    const listData = {
      nome: req.body.nome,
      //itens: req.body.itens,
      FK_USUARIO_id: req.body.FK_USUARIO_id
    };
    const list = await List.create(listData);
    res.send(list);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar lista', error: error.message });
  }
};

export const getlists = async (req, res) => {
  try {
    const { FK_USUARIO_id } = req.body;
    if (!FK_USUARIO_id) {
      return res.status(400).json({ message: 'usuarioId é obrigatório' });
    }
    const lists = await List.findAll({ where: { FK_USUARIO_id } });
    console.log("Listas encontradas:", lists);
    console.log("Nomes das listas:", lists.map(list => list.nome));
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar listas', error: error.message });
  }
}
export const deletelist = async (req, res) => {
  try {
    const id = req.body.id;
    console.log("Id da lista a ser deletada:", id);
    console.log("Nome da lista a ser deletada:", req.body.nome);
    const deletedList = await List.destroy({ where: { id: id } });

    if (deletedList) {
      res.status(200).json({ message: 'Lista deletada com sucesso' });
    } else {
      res.status(404).json({ message: 'Lista não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar lista', error: error.message });
  }
};

export const updatelist = async (req, res) => {
  try {
    const { id, nome } = req.body;
    console.log("Id da lista a ser atualizada:", id);
    console.log("Novo nome da lista:", nome);

    const updatedList = await List.update({ nome: nome }, { where: { id: id } });

    if (updatedList[0] > 0) {
      res.status(200).json({ message: 'Lista atualizada com sucesso' });
    } else {
      res.status(404).json({ message: 'Lista não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar lista', error: error.message });
  }
}


export const additem = async (req, res) => {
  try {
    const { nomeItem, listaRecebe } = req.body;

    if (!nomeItem || !listaRecebe) {
      return res.status(400).json({ error: 'Nome do item e ID da lista são obrigatórios' });
    }

    const lista = await List.findByPk(listaRecebe);
    if (!lista) {
      return res.status(404).json({ error: 'Lista não encontrada' });
    }

    const novosItens = lista.itens ? `${lista.itens},${nomeItem.trim()}` : nomeItem.trim();

    await List.update(
      { itens: novosItens },
      { where: { id: listaRecebe } }
    );

    res.status(201).json({
      id: Date.now(), // ID temporário
      itens: nomeItem.trim()
    });
  } catch (error) {
    console.error('Erro ao adicionar item:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const removeitem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID do item é obrigatório' });
    }

    const item = await ItemLista.findByPk(id);

    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    await item.destroy();

    res.status(200).json({ message: 'Item removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover item:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


export const toggleitem = async (req, res) => {
  try {
    const { id } = req.params;
    const { concluido } = req.body;

    if (!id || concluido === undefined) {
      return res.status(400).json({ error: 'ID do item e estado são obrigatórios' });
    }

    const item = await ItemLista.findByPk(id);

    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    await item.update({ concluido });

    res.status(200).json({ message: 'Item atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao alternar estado do item:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    
    if (!resetToken || !newPassword) {
      return res.status(400).json({ message: 'Token de reset e nova senha são obrigatórios' });
    }
    
    try {
      const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
      const user = await User.findOne({ where: { email: decoded.email } });
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      // Atualiza a senha do usuário
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.update({ senha: hashedPassword }, { where: { id: user.id } });
      
      res.json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
      return res.status(401).json({ message: 'Token de reset inválido ou expirado' });
    }
  } catch (error) {
    console.error('Erro ao resetar senha:', error);
    res.status(500).json({ message: 'Erro ao resetar senha', error: error.message });
  }
};

export const sendEmail = async (req, res) => {
  try {
    console.log("Requisição para envio de email recebida:", req.body);
    const { email } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    console.log("Usuário encontrado para recuperação de senha:", user.email);
    const resetToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Configura o transportador de email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const resetUrl = `${process.env.FRONTEND_URL}/forgotpwd/dispemail?token=${resetToken}`;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Recuperação de Senha - Tá Pago',
      html: `
        <h1>Recuperação de Senha</h1>
        <p>Você solicitou a recuperação de senha da sua conta no Tá Pago.</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${resetUrl}">Redefinir Senha</a>
        <p>Este link é válido por 1 hora.</p>
        <p>Se você não solicitou a recuperação de senha, ignore este email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ 
      message: 'Email de recuperação enviado com sucesso!',
      resetToken // Enviando o token para desenvolvimento/testes
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ message: 'Erro ao enviar email', error: error.message });
  }
};

export const toggletask = async (req, res) => {
  try {
    const { id } = req.params;
    const { concluida } = req.body;
    console.log("Id da tarefa a ser alternada:", id);
    console.log("Novo status de concluída:", concluida);

    const updatedTask = await Task.update({ concluida: concluida }, { where: { id: id } });

    if (updatedTask[0] > 0) {
      res.status(200).json({ message: 'Status da tarefa atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status da tarefa', error: error.message });
  }
};