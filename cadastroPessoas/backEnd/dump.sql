CREATE DATABASE cadastroPessoa;
USE cadastroPessoa;

CREATE TABLE usuario (
id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50),
email VARCHAR(50),
senha VARCHAR(100),
cpf_cnpj VARCHAR(50),
ativo BOOLEAN DEFAULT TRUE
);

SELECT * FROM usuario;

