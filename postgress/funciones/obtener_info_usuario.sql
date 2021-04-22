CREATE OR REPLACE FUNCTION obtener_info_usuario(IN _cedula INT)
RETURNS TABLE (Alias VARCHAR(20), TipoUsuario VARCHAR(50), ) AS
$$
BEGIN
    RETURN QUERY
        SELECT U.Alias, TU.Nombre
        FROM Usuarios U
        INNER JOIN TiposUsuarios TU ON TU.IdTipo = U.IdTipo
        WHERE U.Cedula = _cedula;
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION obtener_info_usuario(int) SET SCHEMA casa_subastas_schema;

ALTER FUNCTION obtener_info_usuario(int) OWNER TO app;

GRANT EXECUTE ON FUNCTION obtener_info_usuario TO administrador_subastas;

GRANT EXECUTE ON FUNCTION obtener_info_usuario TO participante_subastas;