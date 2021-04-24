CREATE OR REPLACE FUNCTION obtener_telefonos_usuario (IN p_cedula INT)
RETURNS TABLE (Telefono INT)
AS
$$
BEGIN
    RETURN QUERY
        SELECT T.Telefono
        FROM Telefonos T
        WHERE T.IdUsuario = p_cedula;
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION obtener_telefonos_usuario(INT) SET SCHEMA casa_subastas_schema;

ALTER FUNCTION obtener_telefonos_usuario(INT) OWNER TO app;

GRANT EXECUTE ON FUNCTION obtener_telefonos_usuario TO administrador_subastas;