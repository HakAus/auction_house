CREATE TABLE TiposUsuarios
(
    IdTipo SERIAL NOT NULL PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

INSERT INTO TiposUsuarios (Nombre) VALUES('administrador');

INSERT INTO TiposUsuarios (Nombre) VALUES('participante');

