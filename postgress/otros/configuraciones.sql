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

-- Creacion de tablas para registro e inicio de sesion

-- Llamada a funciones 
