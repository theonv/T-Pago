-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           11.6.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para ta-pago
CREATE DATABASE IF NOT EXISTS `ta-pago` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `ta-pago`;

-- Copiando estrutura para tabela ta-pago.configuracao
CREATE TABLE IF NOT EXISTS `configuracao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tema` varchar(50) DEFAULT NULL,
  `hora_notificacao` time DEFAULT NULL,
  `grupo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `grupo_id` (`grupo_id`),
  CONSTRAINT `configuracao_ibfk_1` FOREIGN KEY (`grupo_id`) REFERENCES `grupo` (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela ta-pago.configuracao: ~0 rows (aproximadamente)
DELETE FROM `configuracao`;

-- Copiando estrutura para tabela ta-pago.grupo
CREATE TABLE IF NOT EXISTS `grupo` (
  `id_grupo` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_criacao` date NOT NULL,
  `descricao` text DEFAULT NULL,
  PRIMARY KEY (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela ta-pago.grupo: ~0 rows (aproximadamente)
DELETE FROM `grupo`;

-- Copiando estrutura para tabela ta-pago.lembrete
CREATE TABLE IF NOT EXISTS `lembrete` (
  `id_lembrete` int(11) NOT NULL AUTO_INCREMENT,
  `horario_notificacao` time DEFAULT NULL,
  `mensagem` text DEFAULT NULL,
  `tarefa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_lembrete`),
  KEY `tarefa_id` (`tarefa_id`),
  CONSTRAINT `lembrete_ibfk_1` FOREIGN KEY (`tarefa_id`) REFERENCES `tarefa` (`id_tarefa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela ta-pago.lembrete: ~0 rows (aproximadamente)
DELETE FROM `lembrete`;

-- Copiando estrutura para tabela ta-pago.tarefa
CREATE TABLE IF NOT EXISTS `tarefa` (
  `id_tarefa` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` text NOT NULL,
  `data` date DEFAULT NULL,
  PRIMARY KEY (`id_tarefa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela ta-pago.tarefa: ~0 rows (aproximadamente)
DELETE FROM `tarefa`;

-- Copiando estrutura para tabela ta-pago.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_cadastro` date NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela ta-pago.usuario: ~2 rows (aproximadamente)
DELETE FROM `usuario`;
INSERT INTO `usuario` (`id_usuario`, `nome`, `email`, `senha`, `data_cadastro`) VALUES
	(1, 'João Silva', 'joao@email.com', 'senha123', '2023-01-01'),
	(2, 'Maria Souza', 'maria@email.com', 'senha456', '2023-02-15');

-- Copiando estrutura para tabela ta-pago.usuario_grupo
CREATE TABLE IF NOT EXISTS `usuario_grupo` (
  `usuario_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL,
  PRIMARY KEY (`usuario_id`,`grupo_id`),
  KEY `grupo_id` (`grupo_id`),
  CONSTRAINT `usuario_grupo_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `usuario_grupo_ibfk_2` FOREIGN KEY (`grupo_id`) REFERENCES `grupo` (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela ta-pago.usuario_grupo: ~0 rows (aproximadamente)
DELETE FROM `usuario_grupo`;

-- Copiando estrutura para tabela ta-pago.usuario_tarefa
CREATE TABLE IF NOT EXISTS `usuario_tarefa` (
  `usuario_id` int(11) NOT NULL,
  `tarefa_id` int(11) NOT NULL,
  PRIMARY KEY (`usuario_id`,`tarefa_id`),
  KEY `tarefa_id` (`tarefa_id`),
  CONSTRAINT `usuario_tarefa_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `usuario_tarefa_ibfk_2` FOREIGN KEY (`tarefa_id`) REFERENCES `tarefa` (`id_tarefa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela ta-pago.usuario_tarefa: ~0 rows (aproximadamente)
DELETE FROM `usuario_tarefa`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
