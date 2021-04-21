CREATE OR REPLACE FUNCTION obtener_categorias() 
RETURNS TABLE (id INT, nombre VARCHAR(100))
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
	SELECT * FROM Categorias;
END; $$
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION obtener_categorias() SET SCHEMA casa_subastas_schema;
ALTER FUNCTION obtener_categorias() OWNER TO app;
-- GRANT EXECUTE ON FUNCTION get_Items TO administrador_subastas;
GRANT EXECUTE ON FUNCTION obtener_categorias TO participante_subastas;