CREATE DATABASE hotelGerenciamento;
USE hotelGerenciamento;

CREATE TABLE cliente (
	id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(100),
    cpf VARCHAR(45) UNIQUE,
    numero_telefone VARCHAR(45)
);

CREATE TABLE funcionario (
	id_funcionario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(100),
    cpf VARCHAR(45) UNIQUE,
    numero_telefone VARCHAR(45),
    ativo BOOLEAN
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
	id_reserva INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    data_reserva_inicio DATETIME,
	data_criado DATETIME,
    data_excluido DATETIME,
    data_editado DATETIME,
    data_reserva_fim DATETIME,
    ativo INT DEFAULT 1,
    quarto_id INT,
	cliente_id INT,
    funcionario_id INT,
    FOREIGN KEY (quarto_id)
    REFERENCES quarto (id_quarto),
    FOREIGN KEY (cliente_id)
    REFERENCES cliente (id_cliente),
    FOREIGN KEY (funcionario_id)
    REFERENCES funcionario (id_funcionario)
);

INSERT INTO cliente (nome, email, senha, cpf, numero_telefone)
VALUES 
("Erics", "es@gmail.com", "12345678", "000.000.231-00", "48 999999999"),
("Carlos", "Car@gmail.com", "12345678", "000.424.000-00", "48 999999999"),
("Jose", "Jos@gmail.com", "12345678", "412.000.000-00", "48 999999999");

INSERT INTO funcionario (nome, email, senha, cpf, numero_telefone, ativo)
VALUES 
("Ionela", "I@gmail.com", "12345678", "521.000.000-00", "48 999999999", 1),
("Nadia", "nadia@gmail.com", "12345678", "000.000.142-00", "48 999999999", 1),
("Beto", "Be@gmail.com", "12345678", "000.000.000-12", "48 999999999", 1);

INSERT INTO quarto (numero_quarto, capacidade_hospedes, tipo_quarto, preco) VALUES
(203, 4, "Duplo", 240),
(105, 2, "Simples", 60),
(401, 6, "Suíte", 460);

INSERT INTO reserva (data_reserva_inicio, data_criado, data_reserva_fim, ativo, quarto_id, cliente_id, funcionario_id)
VALUES 
("2017-06-15 14:00:00", "2017-06-12 00:00:00", "2017-06-16 00:00:00", 1, 2, 1, 1),
("2019-02-23 10:00:00","2017-06-12 00:00:00", "2017-06-16 00:00:00", 1, 1, 3, 2),
("2022-11-02 22:00:00","2017-06-12 00:00:00", "2017-06-16 00:00:00", 0, 3, 1, 3);

SELECT * FROM cliente;

SELECT * FROM funcionario;

SELECT * FROM reserva;

SELECT * FROM quarto;