CREATE OR REPLACE PROCEDURE crear_comentario_comprador
(
    IN p_id_venta INT, 
    IN p_comentario TEXT, 
    IN p_fecha_hora TIMESTAMP,
    IN p_calificacion INT
)
AS
$$
BEGIN
    INSERT INTO ComentarioComprador (IdVenta, Comentario, FechaHora, Calificacion)
    VALUES (p_id_venta, p_comentario, p_fecha_hora, p_calificacion);
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER PROCEDURE crear_comentario_comprador(INT, TEXT, TIMESTAMP, INT) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE crear_comentario_comprador(INT, TEXT, TIMESTAMP, INT) OWNER TO app;

-- GRANT EXECUTE ON PROCEDURE crear_item TO administrador_subastas;

GRANT EXECUTE ON PROCEDURE crear_comentario_comprador TO participante_subastas;