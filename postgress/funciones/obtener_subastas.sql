CREATE OR REPLACE FUNCTION obtener_subastas() RETURNS TABLE(IdSubasta INT,IdItemSubastado INT,IdVendedor INT, FechaHoraCierre TIMESTAMP,DetallesDeEntrega TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
return query
	SELECT * FROM Subastas;
END; $$
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION obtener_subastas() SET SCHEMA casa_subastas_schema;
ALTER FUNCTION obtener_subastas() OWNER TO app;
-- GRANT EXECUTE ON FUNCTION get_Items TO administrador_subastas;
GRANT EXECUTE ON FUNCTION obtener_subastas TO participante_subastas;