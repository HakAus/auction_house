CREATE OR REPLACE FUNCTION obtener_subastas_vendedor (IN p_id_vendedor INT)
RETURNS TABLE (IdSubasta int, FechaHoraCierre TIMESTAMP, DescripcionItem TEXT)
LANGUAGE plpgsql--Que quiero retornar? Formato similar al de las
AS
$$
BEGIN
    RETURN QUERY
        SELECT S.idSubasta, S.FechaHoraCierre, I.Descripcion
        FROM Subastas S
        INNER JOIN Usuarios U ON U.Cedula = S.IdVendedor
        INNER JOIN Items I ON I.IdItem = S.IdItemSubastado
        WHERE S.IdVendedor = p_id_vendedor;
END; $$
SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION obtener_subastas_vendedor(INT) SET SCHEMA casa_subastas_schema;
ALTER FUNCTION obtener_subastas_vendedor(INT) OWNER TO app;
GRANT EXECUTE ON FUNCTION obtener_subastas_vendedor TO administrador_subastas;
GRANT EXECUTE ON FUNCTION obtener_subastas_vendedor TO participante_subastas;