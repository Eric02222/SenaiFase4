CREATE DATABASE agendamento_faxina;
USE agendamento_faxina;

CREATE TABLE cliente (
	id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45),
    cpf VARCHAR(45) UNIQUE,
    endereco VARCHAR(45),
    numero_telefone VARCHAR(45)
);

CREATE TABLE funcionario (
	id_funcionario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45),
    cpf VARCHAR(45) UNIQUE,
    numero_telefone VARCHAR(45),
	endereco VARCHAR(45),
    ativo BOOLEAN
);

CREATE TABLE agendamento (
	id_agendamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    data_servico DATETIME,
	data_criado DATETIME,
    data_finalizado DATETIME,
    ativo BOOLEAN,
	cliente_id INT,
    funcionario_id INT,
    FOREIGN KEY (cliente_id)
    REFERENCES cliente (id_cliente),
    FOREIGN KEY (funcionario_id)
    REFERENCES funcionario (id_funcionario)
);

INSERT INTO cliente (nome, email, senha, cpf, endereco, numero_telefone)
VALUES 
("Erics", "es@gmail.com", "12345678", "000.000.231-00", "armando calil bulos", "48 999999999"),
("Carlos", "Car@gmail.com", "12345678", "000.424.000-00", "Vargem grande", "48 999999999"),
("Jose", "Jos@gmail.com", "12345678", "412.000.000-00", "Rio vermelho", "48 999999999");

INSERT INTO funcionario (nome, email, senha, cpf, endereco, numero_telefone, ativo)
VALUES 
("Ionela", "I@gmail.com", "12345678", "521.000.000-00", "armando calil bulos", "48 999999999", 1),
("Nadia", "nadia@gmail.com", "12345678", "000.000.142-00", "bairro aleatorio", "48 999999999", 1),
("Beto", "Be@gmail.com", "12345678", "000.000.000-12", "Bairro aleatorio", "48 999999999", 1);

INSERT INTO agendamento (data_servico, data_criado, data_finalizado, ativo, cliente_id, funcionario_id)
VALUES 
("2017-06-15 14:00:00", "2017-06-12 00:00:00", "2017-06-16 00:00:00", 1, 1, 1),
("2019-02-23 10:00:00", "2017-06-12 00:00:00", "2017-06-16 00:00:00", 1, 3, 2),
("2022-11-02 22:00:00", "2017-06-12 00:00:00", "2017-06-16 00:00:00", 0, 1, 3);

SELECT * FROM cliente;

SELECT * FROM funcionario;

SELECT * FROM agendamento;