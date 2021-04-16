-- Creacion de un rol que sera dueño de los objetos creados en la base de datos.
CREATE ROLE app;

-- Se crea el Schema que contendra todos los objetos de la base de datos de la casa de subastas
CREATE SCHEMA casa_subastas AUTHORIZATION app;
ALTER ROLE app SET search_path TO casa_subastas;

-- Creacion de rol de administrador
CREATE ROLE administrador_subastas;
REVOKE ALL ON SCHEMA casa_subastas FROM administrador_subastas;
GRANT USAGE ON SCHEMA casa_subastas TO administrador_subastas;
ALTER ROLE administrador_subastas SET search_path TO casa_subastas;

-- Creacion de rol de participante
CREATE ROLE participante_subastas;
REVOKE ALL ON SCHEMA casa_subastas FROM participante_subastas;
GRANT USAGE ON SCHEMA casa_subastas TO participante_subastas;
ALTER ROLE participante_subastas SET search_path TO casa_subastas;

-- Creacion del rol que sera utilizado para establecer la conexion con la aplicación web
CREATE USER pool_user NOINHERIT PASSWORD 'test2021test' IN ROLE administrador_subastas, participante_subastas;
REVOKE ALL ON SCHEMA casa_subastas FROM pool_user;
GRANT CONNECT ON DATABASE auction_house TO pool_user;
GRANT USAGE ON SCHEMA casa_subastas TO pool_user;
ALTER ROLE pool_user SET search_path TO casa_subastas;

GRANT FUNCTION EXECUTE ON autentificar_usuario TO pool_user;
GRANT FUNCTION EXECUTE ON definir_rol TO pool_user;

-- Creacion de tablas para registro e inicio de sesion

-- Funcion que retorna la cedula y alias si existe el usuario con las credenciales indicadas.
CREATE OR REPLACE FUNCTION autentificar_usuario(IN _alias VARCHAR(255), IN _contrasena VARCHAR(15), IN _tipoUsuario VARCHAR(50))
RETURNS TABLE (Cedula INT, Alias VARCHAR(20)) AS
$$
BEGIN
    RETURN QUERY
        SELECT U.Cedula, U.Alias
        FROM Usuarios U
        INNER JOIN TiposUsuarios TU ON TU.Nombre = _tipoUsuario
        WHERE U.Alias = _alias AND U.Contrasena = _contrasena;
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas, pg_temp, pg_catalog;

CREATE OR REPLACE PROCEDURE definir_rol(IN _tipoUsuario VARCHAR(50)) 
AS 
$$
BEGIN
    IF _tipoUsuario = 'administrador' THEN
        SET ROLE administrador_subastas;
    ELSEIF _tipoUsuario = 'participante' THEN
        SET ROLE participante_subastas;
    END IF;
END 
$$ LANGUAGE plpgsql;