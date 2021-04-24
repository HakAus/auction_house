DROP FUNCTION obtener_usuario_para_actualizar;

CREATE OR REPLACE FUNCTION obtener_usuario_para_actualizar(IN p_cedula INT)
RETURNS TABLE (Tipo VARCHAR, Alias VARCHAR, Contrasena VARCHAR, Nombre VARCHAR, PrimerApellido VARCHAR, SegundoApellido VARCHAR, Direccion VARCHAR, Correo VARCHAR) AS
$$
BEGIN
    RETURN QUERY
		SELECT TU.Nombre, U.Alias, U.Contrasena, U.Nombre, U.PrimerApellido, U.SegundoApellido, U.Direccion, U.Correo FROM Usuarios U
        INNER JOIN TiposUsuarios TU ON TU.IdTipo = U.IdTipo
        WHERE U.Cedula = p_cedula;
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;
ALTER FUNCTION obtener_usuario_para_actualizar(INT) SET SCHEMA casa_subastas_schema;

ALTER FUNCTION obtener_usuario_para_actualizar(INT) OWNER TO app;

GRANT EXECUTE ON FUNCTION obtener_usuario_para_actualizar TO administrador_subastas;