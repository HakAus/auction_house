-- Funcion que retorna la cedula y alias si existe el usuario con las credenciales indicadas.
CREATE OR REPLACE FUNCTION autentificar_usuario(IN p_alias VARCHAR(255), IN p_contrasena VARCHAR(15), IN p_tipoUsuario VARCHAR(50))
RETURNS TABLE (Cedula INT, Alias VARCHAR(20)) AS
$$
BEGIN
    call definir_rol(p_tipoUsuario);
    RETURN QUERY
        SELECT U.Cedula, U.Alias
        FROM Usuarios U
        INNER JOIN TiposUsuarios TU ON TU.Nombre = p_tipoUsuario
        WHERE U.Alias = p_alias AND U.Contrasena = p_contrasena;
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION autentificar_usuario(varchar,varchar,varchar) SET SCHEMA casa_subastas_schema;

ALTER FUNCTION autentificar_usuario(varchar,varchar,varchar) OWNER TO app;

GRANT EXECUTE ON FUNCTION autentificar_usuario TO pool_user;