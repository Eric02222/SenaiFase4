CREATE DATABASE reserva_hotel;
USE reserva_hotel;

CREATE TABLE usuario (
	id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(100),
    cpf VARCHAR(45) UNIQUE,
    numero_telefone VARCHAR(45),
    administrador BOOLEAN DEFAULT FALSE
);

CREATE TABLE quarto (
	id_quarto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    numero_quarto INT,
    capacidade_hospedes INT,
    tipo_quarto ENUM("Simples", "Duplo", "Suíte"),
    preco DECIMAL(8,2),
    disponivel BOOLEAN DEFAULT TRUE
);

CREATE TABLE reserva (
	id_agendamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    data_reserva_inicio DATETIME,
	data_reserva_fim DATETIME,
    data_editado DATETIME,
    data_excluido DATETIME,
    ativo BOOLEAN DEFAULT TRUE,
	usuario_id INT,
    quarto_id INT,
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id_usuario),
    FOREIGN KEY (quarto_id)
    REFERENCES quarto (id_quarto)
);

INSERT INTO usuario (nome, email, senha, cpf, numero_telefone, administrador) VALUES
("Carlos", "carlos@gmail.com", "senha super protegida", "58843894235",  "48 999644521", FALSE),
("Bianca", "bia@gmail.com", "senha super protegida", "35489154891", "48 999162741", TRUE),
("Jose", "JO@gmail.com", "senha super protegida", "12535489614", "48 999725031", TRUE),
("Carlinha", "carla@gmail.com", "senha super protegida", "37815696348", "48 999873298", FALSE);

INSERT INTO quarto (numero_quarto, capacidade_hospedes, tipo_quarto, preco) VALUES
(203, 4, "Duplo", 240),
(105, 2, "Simples", 60),
(401, 6, "Suíte", 460),
(303, 2, "Simples", 130);

INSERT INTO reserva (data_reserva_inicio, data_reserva_fim, data_editado, data_excluido, usuario_id, quarto_id) VALUES
("2017-06-15 14:00:00", "2017-06-17 14:00:00", "2017-06-15 14:20:00", "2017-06-15 14:35:00", 3, 2),
("2020-02-22 10:00:00", "2020-02-27 10:00:00", "2020-02-28 11:20:00", "2020-02-28 12:35:00", 1, 1),
("2020-11-15 05:00:00", "2020-11-17 06:00:00", "2020-11-15 14:20:00", "2020-11-15 14:35:00", 4, 3),
("2023-08-15 14:00:00", "2023-08-17 14:00:00", "2023-08-15 14:20:00", "2023-08-15 14:35:00", 2, 4);


