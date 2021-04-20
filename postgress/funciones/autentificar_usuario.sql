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
    SET search_path = casa_subastas_schema, pg_temp;



ALTER FUNCTION autentificar_usuario(varchar,varchar,varchar) SET SCHEMA casa_subastas_schema;

ALTER FUNCTION autentificar_usuario(varchar,varchar,varchar) OWNER TO app;

GRANT EXECUTE ON FUNCTION autentificar_usuario TO pool_user;