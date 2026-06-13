CREATE DATABASE IF NOT EXISTS clinica_db;
USE clinica_db;

CREATE TABLE usuario (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    funcao ENUM('medico', 'analista') NOT NULL,
    pergunta_seguranca VARCHAR(255),
    resposta_seguranca VARCHAR(255)
);

CREATE TABLE agendamento (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    paciente_nome VARCHAR(100) NOT NULL,
    medico_id INT NOT NULL,
    data_hora DATETIME NOT NULL,
    FOREIGN KEY (medico_id) REFERENCES usuario(id) ON DELETE CASCADE,
    UNIQUE KEY (medico_id, data_hora) -- Prevents same doctor at same time
);

-- Admin initial user (Password: admin123)

INSERT INTO usuario (nome, cpf, senha, funcao, pergunta_seguranca, resposta_seguranca)
VALUES ('Administrador', '000.000.000-00', '$2b$10$u/K6vK.r6B3J5Y6uG6qR.O0rIuE8Qk7S.yK9UoG.YwS1m0yP2z3K6', 'analista', 'Qual o nome da clinica?', 'Clinica Saúde');
