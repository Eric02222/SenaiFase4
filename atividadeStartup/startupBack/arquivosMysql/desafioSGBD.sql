CREATE DATABASE startup;

CREATE TABLE usuario (
	id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    senha VARCHAR(150) NOT NULL
);

CREATE TABLE veiculo (
	id_veiculo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150),
    modelo VARCHAR(150) NOT NULL,
    ano VARCHAR(150),
    marca VARCHAR(150),
    status_bateria INT,
    usuario_cadastro INT,
    usuario_atualização INT,
    dataHora_cadastro TIME,
    dataHora_atualização TIME,
    dataHora_exclusao TIME,
    ativo INT,
    FOREIGN KEY (usuario_cadastro)
    REFERENCES usuario (id_usuario)
);




