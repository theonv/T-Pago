import User from '../models/usuario.js';
import Task from '../models/task.js';
import List from '../models/lists.js';

// Login de usuário
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    console.log(email, senha);

    if (!user) {
      console.error('Erro ao realizar login email:');
      return res.status(500).json({ message: 'usuario não encontrado' });
    }

    console.log(user.senha);

    if (user.senha != senha) {
      console.error('Erro ao realizar login senha:');
      return res.status(500).json({ message: 'senha errada papai' });
    }
    res.status(200).json({
      id: user.id,
      senha: user.senha,
      email: user.email,
      message: 'Login realizado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao realizar login F:');
    res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
  }
};

export const cru = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    const userData = {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
    };
    const user = await User.create(userData);
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};


// tarefas
export const createtask = async (req,res) => {
  try {
    console.log("req.body:", req.body);
    const taskData = {
      texto: req.body.texto,
      usuarioId: req.body.usuarioId 
    };
    const task = await Task.create(taskData);
    res.send(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error: error.message });
    
  }
} 
export const gettasks = async (req, res) => {
  try {
    const { usuarioId } = req.body;
    if (!usuarioId) {
      return res.status(400).json({ message: 'usuarioId é obrigatório' });
    }
    const tasks = await Task.findAll({ where: { usuarioId } });
    console.log("Tarefas encontradas:", tasks);
    console.log("Texto das tarefas:", tasks.map(task => task.texto));
    res.json(tasks.map(task => task.texto));
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', error: error.message });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const taskName = req.params.texto;
    console.log("Nome da tarefa a ser deletada:", taskName);
    const deletedTask = await Task.destroy({ where: { texto: taskName } });
    
    if (deletedTask) {
      res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar tarefa', error: error.message });
  }
};



// listas
export const createlist = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    const listData = {
      nome: req.body.nome,
      itens: req.body.itens
    };
    const list = await List.create(listData);
    res.send(list);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar lista', error: error.message });
  }
};
export const getlists = async (req, res) => {
  try {
    const lists = await List.findAll();
    console.log("Listas encontradas:", lists);
    console.log("Nomes das listas:", lists.map(list => list.nome));
    res.json(lists.map(list => list.nome));
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar listas', error: error.message });
  }
}
export const deletelist = async (req, res) => {
  try {
    const listName = req.params.nome;
    console.log("Nome da lista a ser deletada:", listName);
    const deletedList = await List.destroy({ where: { nome: listName } });
    
    if (deletedList) {
      res.status(200).json({ message: 'Lista deletada com sucesso' });
    } else {
      res.status(404).json({ message: 'Lista não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar lista', error: error.message });
  }
}