CREATE OR REPLACE FUNCTION obtener_pujas_maximas() 
RETURNS TABLE (IdSubasta INT, IdOfertante INT, AliasOfertante VARCHAR, Monto DECIMAL(9,2))
AS
$$
BEGIN
    RETURN QUERY
        SELECT PM.IdSubasta, PM.IdOfertante, U.Alias, PM.Monto 
        FROM PujasMaximas PM
        INNER JOIN Usuarios U ON U.Cedula = PM.IdOfertante;
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;


ALTER FUNCTION obtener_pujas_maximas() SET SCHEMA casa_subastas_schema;

ALTER FUNCTION obtener_pujas_maximas() OWNER TO app;

GRANT EXECUTE ON FUNCTION obtener_pujas_maximas TO pool_user;

GRANT EXECUTE ON FUNCTION obtener_pujas_maximas TO administrador_subastas;

GRANT EXECUTE ON FUNCTION obtener_pujas_maximas TO participante_subastas;