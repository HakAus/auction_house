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

ALTER PROCEDURE definir_rol(varchar) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE definir_rol(varchar) OWNER TO app;

GRANT EXECUTE ON PROCEDURE definir_rol TO pool_user;