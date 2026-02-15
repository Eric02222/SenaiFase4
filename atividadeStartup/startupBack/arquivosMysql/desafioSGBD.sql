CREATE DATABASE startup;

CREATE TABLE usuario (
	id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(150) NOT NULL
);

CREATE TABLE veiculo (
	id_veiculo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150),
    modelo VARCHAR(150) NOT NULL,
    ano VARCHAR(150),
    marca VARCHAR(150),
    status_bateria INT NULL,
    usuario_cadastro INT NULL,
    usuario_atualização INT NULL,
    dataHora_cadastro TIME NULL,
    dataHora_atualização TIME NULL,
    dataHora_exclusao TIME NULL,
    ativo INT NOT NULL DEFAULT 1,
    FOREIGN KEY (usuario_cadastro)
    REFERENCES usuario (id_usuario)
);




