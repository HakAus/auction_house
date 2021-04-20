CREATE OR REPLACE FUNCTION obtener_subcategorias() 
RETURNS TABLE (id INT, idCategoria INT, nombre VARCHAR(100), descripcion TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
	SELECT * FROM Subcategorias;
END; $$
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION obtener_subcategorias() SET SCHEMA casa_subastas_schema;
ALTER FUNCTION obtener_subcategorias() OWNER TO app;
-- GRANT EXECUTE ON FUNCTION get_Items TO administrador_subastas;
GRANT EXECUTE ON FUNCTION obtener_subcategorias TO participante_subastas;