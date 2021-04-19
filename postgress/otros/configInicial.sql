-- Se crea la base de datos
CREATE DATABASE casa_subastas;

-- Creacion de un rol que sera dueño de los objetos creados en la base de datos.
CREATE ROLE app;

-- Se crea el Schema que contendra todos los objetos de la base de datos de la casa de subastas. Se debe correr como superusuario
CREATE SCHEMA casa_subastas_schema AUTHORIZATION app;

-- Se cambia el search_path para la base de datos por motivos de seguridad, para que sea el primer schema donde se buscan objetos.
ALTER DATABASE casa_subastas SET search_path TO casa_subastas_schema;

-- Se debe dar permisos de usar y crear en el schema a app.
GRANT USAGE ON SCHEMA casa_subastas_schema TO app;
GRANT CREATE ON SCHEMA casa_subastas_schema TO app;

-- Se cambia el rol para la creación de los objetos dentro del schema.
set role postgres
SET ROLE app;

-- Creacion de rol de administrador
CREATE ROLE administrador_subastas;
REVOKE ALL ON SCHEMA casa_subastas_schema FROM administrador_subastas;
GRANT USAGE ON SCHEMA casa_subastas_schema TO administrador_subastas;

-- Creacion de rol de participante
CREATE ROLE participante_subastas;
REVOKE ALL ON SCHEMA casa_subastas_schema FROM participante_subastas;
GRANT USAGE ON SCHEMA casa_subastas_schema TO participante_subastas;

-- Creacion del rol que sera utilizado para establecer la conexion con la aplicación web
CREATE USER pool_user NOINHERIT PASSWORD 'test2021test' IN ROLE administrador_subastas, participante_subastas;
REVOKE ALL ON SCHEMA casa_subastas_schema FROM pool_user;
GRANT CONNECT ON DATABASE casa_subastas TO pool_user;
GRANT USAGE ON SCHEMA casa_subastas_schema TO pool_user;

CREATE TABLE TiposUsuarios
(
    IdTipo SERIAL NOT NULL PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

INSERT INTO TiposUsuarios (Nombre) VALUES('administrador');

INSERT INTO TiposUsuarios (Nombre) VALUES('participante');
CREATE TABLE Usuarios
(
    Cedula INT NOT NULL PRIMARY KEY,
    IdTipo INT NOT NULL,
    Alias VARCHAR(20) NOT NULL, 
    Contrasena VARCHAR(15) NOT NULL,  
    Nombre VARCHAR(100) NOT NULL,
    PrimerApellido VARCHAR(100) NOT NULL,
    SegundoApellido VARCHAR(100) NOT NULL,
    Direccion VARCHAR(300) NOT NULL,
    Correo VARCHAR(200) NOT NULL,

    -- Check that alias is alphanumeric and between 1 and 20 characters
    CONSTRAINT C_Formato_Alias_Valido
    CHECK (Alias ~ '^[A-Za-z0-9]{1,20}$'),
    -- Check that password is between 8 and 15 characters
    CONSTRAINT C_Formato_Contrasena_Valido
    CHECK (Contrasena ~ '^.{8,15}$'),
    CONSTRAINT FK_TipoUsuario_Usuario
    FOREIGN KEY (IdTipo) REFERENCES TiposUsuarios(IdTipo)
    ON DELETE CASCADE
);
CREATE TABLE Telefonos
(
    IdTelefono SERIAL NOT NULL PRIMARY KEY,
    IdUsuario INT NOT NULL,
    Telefono INT NOT NULL,

    CONSTRAINT FK_Usuarios_Telefonos
    FOREIGN KEY (IdUsuario)
    REFERENCES Usuarios(Cedula)
);

CREATE TABLE Categorias
(
    IdCategoria SERIAL NOT NULL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion TEXT NOT NULL
);

CREATE TABLE Subcategorias
(
    IdSubcategoria SERIAL NOT NULL PRIMARY KEY,
    IdCategoria INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion TEXT NOT NULL,

    CONSTRAINT FK_Categorias_Subcategorias
    FOREIGN KEY (IdCategoria)
    REFERENCES Categorias(IdCategoria)
);

CREATE TABLE Items
(
    IdItem SERIAL NOT NULL PRIMARY KEY,
    IdSubcategoria INT NOT NULL,
    PrecioBase DECIMAL(9,2) NOT NULL,
    Descripcion TEXT NOT NULL,
    Imagen BYTEA,

    -- TODO: Test
    CONSTRAINT C_Tamano_Imagen
    CHECK (octet_length(Imagen) <= 25 * 1024),

    CONSTRAINT FK_Subcategoria_Items
    FOREIGN KEY (IdSubcategoria)
    REFERENCES Subcategorias(IdSubcategoria)
);

CREATE TABLE Subastas
(
    IdSubasta SERIAL NOT NULL PRIMARY KEY,
    IdItemSubastado INT NOT NULL,
    IdVendedor INT NOT NULL,
    FechaHoraCierre TIMESTAMP NOT NULL,
    DetallesDeEntrega TEXT NOT NULL,

    CONSTRAINT FK_Items_Subastas
    FOREIGN KEY (IdItemSubastado)
    REFERENCES Items(IdItem),

    CONSTRAINT FK_Usuarios_Subastas
    FOREIGN KEY (IdVendedor)
    REFERENCES Usuarios (Cedula)
);

CREATE TABLE Ofertas
(
    IdOferta SERIAL NOT NULL PRIMARY KEY,
    IdSubasta INT NOT NULL,
    IdOfertante INT NOT NULL,
    Monto DECIMAL(9,2) NOT NULL,
    FechaTiempo TIMESTAMP NOT NULL,
    Ganadora BOOLEAN NOT NULL,

    CONSTRAINT FK_Subastas_Ofertas
    FOREIGN KEY (IdSubasta)
    REFERENCES Subastas(IdSubasta),

    CONSTRAINT FK_Usuarios_Ofertas
    FOREIGN KEY (IdOfertante)
    REFERENCES Usuarios(Cedula)
);

CREATE TABLE Ventas
(
    IdVenta SERIAL NOT NULL PRIMARY KEY,
    IdSubasta INT NOT NULL,
    IdComprador INT NOT NULL,

    CONSTRAINT FK_Subastas_Ventas
    FOREIGN KEY (IdSubasta)
    REFERENCES Subastas(IdSubasta),

    CONSTRAINT FK_Usuarios_Ventas
    FOREIGN KEY (IdComprador)
    REFERENCES Usuarios(Cedula)
);
CREATE TABLE ComentariosComprador
(
    IdComentario SERIAL NOT NULL PRIMARY KEY,
    IdVenta INT NOT NULL,
    Comentario TEXT NOT NULL,
    FechaHora TIMESTAMP NOT NULL,
    Calificacion VARCHAR NOT NULL,

    CONSTRAINT FK_ComentariosComprador_Ventas
    FOREIGN KEY (IdVenta)
    REFERENCES Ventas(IdVenta)

    
);

CREATE TABLE ComentariosVendedor
(
    IdComentario SERIAL NOT NULL PRIMARY KEY,
    IdVenta INT NOT NULL,
    Comentario TEXT NOT NULL,
    FechaHora TIMESTAMP NOT NULL,

    CONSTRAINT FK_ComentarioVendedor_Ventas
    FOREIGN KEY (IdVenta)
    REFERENCES Ventas(IdVenta)
);