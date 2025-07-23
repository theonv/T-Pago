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
export const createlist = async (req,res) => {
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