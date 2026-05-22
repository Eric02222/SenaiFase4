CREATE DATABASE farmacia_db;
USE farmacia_db;

CREATE TABLE usuario(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50),
email VARCHAR(50),
senha VARCHAR(50),
cpf VARCHAR(50) UNIQUE
);

CREATE TABLE fornecedor(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50),
email VARCHAR(50),
endereco VARCHAR(50)
);

CREATE TABLE medicamento(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255) NOT NULL,
tipo VARCHAR(100),
dosagem VARCHAR(100),
marca VARCHAR(50),
quantidade INT,
estoque_minimo INT(10),
fornecedor_id INT,
FOREIGN KEY (fornecedor_id)
REFERENCES fornecedor (id)
);

CREATE TABLE movimentacao(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
data_adicionado DATETIME,
data_edicao DATETIME,
data_exclusao DATETIME,
usuario_id INT,
medicamento_id INT,
FOREIGN KEY (usuario_id)
REFERENCES usuario (id),
FOREIGN KEY (medicamento_id)
REFERENCES medicamento (id)
);

INSERT INTO usuario (nome, email, senha, cpf)
VALUES
("sergio", "sergio@gmail.com", "senhamuitoboa14", "27324885335"),
("Maria", "maria@gmail.com", "inquebravel35", "68716254895"),
("Paulo", "paulo@gmail.com", "586713281", "30418901348");

INSERT INTO fornecedor (nome, email, endereco)
VALUES
("Laura", "La@gmail.com", "Curitiba"),
("Fabio", "fabio@gmail.com", "mato grosso do sul"),
("Juan", "Jua@gmail.com", "guarapuava");

INSERT INTO medicamento (nome, tipo, dosagem, marca, quantidade, estoque_minimo , fornecedor_id)
VALUES
("remedio para dor de cabeça", "tipo aleatorio", "150g", "generico", 30, 12, 1),
("remedio para dormir", "tipo aleatorio", "350g", "generico", 40, 12, 1),
("remedio febre", "tipo aleatorio", "210g", "generico", 14, 10, 1);

INSERT INTO movimentacao (data_adicionado, data_edicao, data_exclusao, usuario_id, medicamento_id)
VALUES
("2017-06-15 14:00:00", "2019-11-15 19:00:00", "2019-11-18 14:00:00", 1, 2),
("2020-03-15 14:00:00", "2021-02-15 10:00:00", "2021-05-15 08:00:00", 3, 3),
("2018-12-15 14:00:00", "2019-06-15 16:00:00", "2020-06-15 20:00:00", 2, 1);

