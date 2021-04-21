CREATE OR REPLACE FUNCTION obtener_maxima_puja(p_id_subasta int) RETURNS NUMERIC
AS
$$
DECLARE
    maxPrice NUMERIC;
BEGIN
    SELECT INTO maxPrice Max(monto) from Ofertas where IdSubasta = p_id_subasta;
    RETURN maxPrice;
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION obtener_maxima_puja(INT) SET SCHEMA casa_subastas_schema;

ALTER FUNCTION obtener_maxima_puja(INT) OWNER TO app;

GRANT EXECUTE ON FUNCTION obtener_maxima_puja TO administrador_subastas;

GRANT EXECUTE ON FUNCTION obtener_maxima_puja TO participante_subastas;