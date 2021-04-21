CREATE OR REPLACE PROCEDURE crear_subasta
(
    IN p_id_item_subastado INT, 
    IN p_alias_vendedor VARCHAR(100), 
    IN p_fecha_hora_cierre TIMESTAMP, 
    IN p_detalles_de_entrega TEXT
)
AS
$$
DECLARE
    id_vendedor INT := 0;
BEGIN

    SELECT U.Cedula INTO id_vendedor FROM Usuarios U WHERE U.Alias = p_alias_vendedor;
    INSERT INTO Subastas (IdItemSubastado, IdVendedor, FechaHoraCierre, DetallesDeEntrega)
    VALUES (p_id_item_subastado, id_vendedor, p_fecha_hora_cierre, p_detalles_de_entrega);
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER PROCEDURE crear_subasta(INT, INT, TIMESTAMP, TEXT) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE crear_subasta(INT, INT, TIMESTAMP, TEXT) OWNER TO app;

-- GRANT EXECUTE ON PROCEDURE crear_item TO administrador_subastas;

GRANT EXECUTE ON PROCEDURE crear_subasta TO participante_subastas;