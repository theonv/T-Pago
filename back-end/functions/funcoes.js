import User from '../models/usuario.js';
import Task from '../models/task.js';

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
export const createtask = async (req,res) => {
  try {
    console.log("req.body:", req.body);
    const taskData = {
      texto: req.body.texto
    };
    const task = await Task.create(taskData);
    res.send(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error: error.message });
    
  }
} 
export const gettasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
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
}