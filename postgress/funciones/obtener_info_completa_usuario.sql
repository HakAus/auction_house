CREATE OR REPLACE FUNCTION obtener_info_completa_usuario(IN _cedula INT)
RETURNS TABLE (Alias VARCHAR(20), TipoUsuario VARCHAR(50), Contrasena VARCHAR(15), Nombre VARCHAR(100), PrimerApellido VARCHAR(100), SegundoApellido VARCHAR(100), Direccion VARCHAR(300), Correo VARCHAR(200)) AS
$$
BEGIN
    RETURN QUERY
        SELECT U.Alias, TU.Nombre, U.Contrasena, U.Nombre, U.PrimerApellido, U.SegundoApellido, U.Direccion, U.Correo
        FROM Usuarios U
        INNER JOIN TiposUsuarios TU ON TU.IdTipo = U.IdTipo
        WHERE U.Cedula = _cedula;
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION obtener_info_completa_usuario(int) SET SCHEMA casa_subastas_schema;

ALTER FUNCTION obtener_info_completa_usuario(int) OWNER TO app;

GRANT EXECUTE ON FUNCTION obtener_info_completa_usuario TO administrador_subastas;