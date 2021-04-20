CREATE OR REPLACE PROCEDURE crear_item
(
    IN p_id_subcategoria INT, 
    IN p_precio_base DECIMAL(9,2), 
    IN p_descripcion TEXT, 
    IN p_imagen BYTEA
)
AS
$$
BEGIN
    INSERT INTO Items (IdSubcategoria, PrecioBase, Descripcion, Imagen)
    VALUES (p_id_subcategoria, p_precio_base, p_descripcion, p_imagen);
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER PROCEDURE crear_item(INT, DECIMAL(9,2), TEXT, BYTEA) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE crear_item(INT, DECIMAL(9,2), TEXT, BYTEA) OWNER TO app;

-- GRANT EXECUTE ON PROCEDURE crear_item TO administrador_subastas;

GRANT EXECUTE ON PROCEDURE crear_item TO participante_subastas;