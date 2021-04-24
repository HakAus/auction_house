CREATE OR REPLACE PROCEDURE crear_venta
(
    IN p_id_subasta INT, 
    IN p_id_vendedor INT, 
    IN p_id_comprador INT
)
AS
$$
BEGIN
    INSERT INTO Ventas (IdSubasta, IdVendedor, IdComprador)
    VALUES (p_id_subasta, p_id_vendedor, p_id_comprador);
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER PROCEDURE crear_venta(INT, INT, INT) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE crear_venta(INT, INT, INT) OWNER TO app;

-- GRANT EXECUTE ON PROCEDURE crear_item TO administrador_subastas;

GRANT EXECUTE ON PROCEDURE crear_venta TO participante_subastas;