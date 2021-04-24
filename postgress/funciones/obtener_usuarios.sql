SELECT * FROM Usuarios

DROP FUNCTION obtener_usuarios;

CREATE OR REPLACE FUNCTION obtener_usuarios()
RETURNS TABLE (cedula int, alias varchar, correo varchar, tipousuario varchar) AS
$$
BEGIN
    RETURN QUERY
		SELECT U.cedula,U.alias,U.correo, TU.Nombre FROM Usuarios U
    INNER JOIN TiposUsuarios TU ON TU.IdTipo = U.IdTipo
    ORDER BY U.alias;
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;
ALTER FUNCTION obtener_usuarios() SET SCHEMA casa_subastas_schema;

ALTER FUNCTION obtener_usuarios() OWNER TO app;

GRANT EXECUTE ON FUNCTION obtener_usuarios TO administrador_subastas;

GRANT EXECUTE ON FUNCTION obtener_usuarios TO participante_subastas;