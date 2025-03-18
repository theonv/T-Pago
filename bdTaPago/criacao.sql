CREATE DATABASE IF NOT EXISTS `ta-pago` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ta-pago`;

CREATE TABLE IF NOT EXISTS `configuracao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tema` varchar(50) DEFAULT NULL,
  `hora_notificacao` time DEFAULT NULL,
  `grupo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `grupo_id` (`grupo_id`),
  CONSTRAINT `configuracao_ibfk_1` FOREIGN KEY (`grupo_id`) REFERENCES `grupo` (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `grupo` (
  `id_grupo` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_criacao` date NOT NULL,
  `descricao` text DEFAULT NULL,
  PRIMARY KEY (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `lembrete` (
  `id_lembrete` int(11) NOT NULL AUTO_INCREMENT,
  `horario_notificacao` time DEFAULT NULL,
  `mensagem` text DEFAULT NULL,
  `tarefa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_lembrete`),
  KEY `tarefa_id` (`tarefa_id`),
  CONSTRAINT `lembrete_ibfk_1` FOREIGN KEY (`tarefa_id`) REFERENCES `tarefa` (`id_tarefa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `tarefa` (
  `id_tarefa` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` text NOT NULL,
  `data` date DEFAULT NULL,
  PRIMARY KEY (`id_tarefa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_cadastro` date NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `usuario` (`id_usuario`, `nome`, `email`, `senha`, `data_cadastro`) VALUES
  (1, 'João Silva', 'joao@email.com', 'senha123', '2023-01-01'),
  (2, 'Maria Souza', 'maria@email.com', 'senha456', '2023-02-15');

CREATE TABLE IF NOT EXISTS `usuario_grupo` (
  `usuario_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL,
  PRIMARY KEY (`usuario_id`,`grupo_id`),
  KEY `grupo_id` (`grupo_id`),
  CONSTRAINT `usuario_grupo_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `usuario_grupo_ibfk_2` FOREIGN KEY (`grupo_id`) REFERENCES `grupo` (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `usuario_tarefa` (
  `usuario_id` int(11) NOT NULL,
  `tarefa_id` int(11) NOT NULL,
  PRIMARY KEY (`usuario_id`,`tarefa_id`),
  KEY `tarefa_id` (`tarefa_id`),
  CONSTRAINT `usuario_tarefa_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `usuario_tarefa_ibfk_2` FOREIGN KEY (`tarefa_id`) REFERENCES `tarefa` (`id_tarefa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;