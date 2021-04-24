CREATE OR REPLACE PROCEDURE crear_comentario_vendedor
(
    IN p_id_venta INT, 
    IN p_comentario TEXT, 
    IN p_fecha_hora TIMESTAMP
)
AS
$$
BEGIN
    INSERT INTO ComentarioVendedor (IdVenta, Comentario, FechaHora)
    VALUES (p_id_venta, p_comentario, p_fecha_hora);
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER PROCEDURE crear_comentario_vendedor(INT, TEXT, TIMESTAMP) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE crear_comentario_vendedor(INT, TEXT, TIMESTAMP) OWNER TO app;

-- GRANT EXECUTE ON PROCEDURE crear_item TO administrador_subastas;

GRANT EXECUTE ON PROCEDURE crear_comentario_vendedor TO participante_subastas;