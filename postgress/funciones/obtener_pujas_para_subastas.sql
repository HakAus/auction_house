CREATE OR REPLACE FUNCTION obtener_pujas_para_subastas(IN p_id_subasta INT)
RETURNS TABLE (p_ifOferta INT,p_id_ofertante INT, p_monto DECIMAL(9,2), p_fecha_tiempo TIMESTAMP, p_ganadora INT) AS
$$
BEGIN
    RETURN QUERY
        SELECT O.idOferta,O.IdOfertante, O.Monto, O.FechaTiempo, O.Ganadora
        FROM Ofertas O
        WHERE O.IdSubasta = p_id_subasta
        ORDER BY O.FechaTiempo DESC;
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION obtener_pujas_para_subastas(INT) SET SCHEMA casa_subastas_schema;

ALTER FUNCTION obtener_pujas_para_subastas(INT) OWNER TO app;

GRANT EXECUTE ON FUNCTION obtener_pujas_para_subastas TO administrador_subastas;

GRANT EXECUTE ON FUNCTION obtener_pujas_para_subastas TO participante_subastas;