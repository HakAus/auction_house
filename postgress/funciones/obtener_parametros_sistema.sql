CREATE OR REPLACE FUNCTION obtener_parametros_sistema()
RETURNS TABLE (Mejora DECIMAL(9,2), IncrementoMinimo DECIMAL(9,2))
AS
$$
BEGIN
    RETURN QUERY
        SELECT PS.Mejora, PS.IncrementoMinimo
        FROM ParametrosSistema PS;
END;
$$
LANGUAGE plpgsql;


ALTER FUNCTION obtener_parametros_sistema() SET SCHEMA casa_subastas_schema;

ALTER FUNCTION obtener_parametros_sistema() OWNER TO app;

GRANT EXECUTE ON FUNCTION obtener_parametros_sistema TO pool_user;

GRANT EXECUTE ON FUNCTION obtener_parametros_sistema TO administrador_subastas;