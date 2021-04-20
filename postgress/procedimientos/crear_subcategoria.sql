CREATE OR REPLACE PROCEDURE crear_subcategoria
(
    IN p_id_subcategoria INT, 
    IN p_nombre VARCHAR(100),
    IN p_descripcion TEXT
)
AS
$$
BEGIN
    INSERT INTO Subcategorias (IdSubcategoria, Nombre, Descripcion)
    VALUES (p_id_subcategoria, p_nombre, p_descripcion);
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER PROCEDURE crear_subcategoria(INT, VARCHAR(100), TEXT) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE crear_subcategoria(INT, VARCHAR(100), TEXT) OWNER TO app;

GRANT EXECUTE ON PROCEDURE crear_subcategoria TO administrador_subastas;