CREATE OR REPLACE FUNCTION obtener_ventas_por_comprador (IN p_id_comprador INT)
RETURNS TABLE (IdSubasta int, FechaHoraCierre TIMESTAMP, DescripcionItem TEXT)
LANGUAGE plpgsql
AS
$$
BEGIN
    RETURN QUERY
        SELECT S.IdSubasta, S.FechaHoraCierre, I.Descripcion
        FROM Ventas V
        INNER JOIN Usuario U ON U.Cedula = p_id_comprador
        INNER JOIN Subasta S  ON S.IdSubasta = V.IdSubasta
        INNER JOIN Item I ON I.IdItem = S.IdItemSubastado
        INNER JOIN Oferta O ON O.IdSubasta = S.IdSubasta
        WHERE O.Ganadora = 1 AND O.IdSubasta = S.IdSubasta;
END; $$
SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION obtener_ventas_por_comprador(INT) SET SCHEMA casa_subastas_schema;
ALTER FUNCTION obtener_ventas_por_comprador(INT) OWNER TO app;
GRANT EXECUTE ON FUNCTION obtener_ventas_por_comprador TO administrador_subastas;
GRANT EXECUTE ON FUNCTION obtener_ventas_por_comprador TO participante_subastas;