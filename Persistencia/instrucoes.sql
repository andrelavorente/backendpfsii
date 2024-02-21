CREATE DATABASE ranazi;

USE ranazi;

CREATE TABLE usuario(
    usu_codigo INT NOT NULL AUTO_INCREMENT,
    usu_user VARCHAR(30) NOT NULL,
    usu_pass VARCHAR(30) NOT NULL,
    usu_dataCriacao VARCHAR(20) NOT NULL,
    usu_dataAlteracao VARCHAR(20) NOT NULL,
    codigo_perfil  INT NOT NULL,
    CONSTRAINT pk_usario PRIMARY KEY(codigo)
    CONSTRAINT fk_perfil FOREIGN KEY(codigo_perfil) REFERENCES perfil(per_codigo)
);

CREATE TABLE perfil(
    per_codigo INT NOT NULL AUTO_INCREMENT,
    per_nome   VARCHAR(30) NOT NULL,
    CONSTRAINT pk_perfil PRIMARY KEY(per_codigo)
);