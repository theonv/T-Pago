-- Criando o banco de dados
CREATE DATABASE gerenciador_tarefas;
USE gerenciador_tarefas;

-- Criando as tabelas
CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro DATE NOT NULL
);

CREATE TABLE tarefa (
    id_tarefa INT PRIMARY KEY AUTO_INCREMENT,
    descricao TEXT NOT NULL,
    status ENUM('Aberta', 'Em Andamento', 'Concluída') NOT NULL,
    data DATE
);

CREATE TABLE grupo (
    id_grupo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_criacao DATE NOT NULL,
    descricao TEXT
);

CREATE TABLE configuracao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tema VARCHAR(50),
    hora_notificacao TIME,
    grupo_id INT,
    FOREIGN KEY (grupo_id) REFERENCES grupo(id_grupo)
);

CREATE TABLE lembrete (
    id_lembrete INT PRIMARY KEY AUTO_INCREMENT,
    horario_notificacao TIME,
    mensagem TEXT,
    tarefa_id INT,
    FOREIGN KEY (tarefa_id) REFERENCES tarefa(id_tarefa)
);

-- Criando as tabelas de relacionamento
CREATE TABLE usuario_tarefa (
    usuario_id INT,
    tarefa_id INT,
    PRIMARY KEY (usuario_id, tarefa_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario),
    FOREIGN KEY (tarefa_id) REFERENCES tarefa(id_tarefa)
);

CREATE TABLE usuario_grupo (
    usuario_id INT,
    grupo_id INT,
    PRIMARY KEY (usuario_id, grupo_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario),
    FOREIGN KEY (grupo_id) REFERENCES grupo(id_grupo)
);

-- Inserindo dados de teste
INSERT INTO usuario (nome, email, senha, data_cadastro)
VALUES
    ('João Silva', 'joao@email.com', 'senha123', '2023-01-01'),
    ('Maria Souza', 'maria@email.com', 'senha456', '2023-02-15');

-- ... (inserir mais dados de teste para as outras tabelas)