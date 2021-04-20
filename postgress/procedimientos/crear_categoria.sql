CREATE OR REPLACE PROCEDURE crear_categoria
(
    IN p_nombre VARCHAR(100), 
    IN p_descripcion TEXT
)
AS
$$
BEGIN
    INSERT INTO Categorias (Nombre, Descripcion)
    VALUES (p_nombre, p_descripcion);
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER PROCEDURE crear_categoria(VARCHAR, TEXT) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE crear_categoria(VARCHAR, TEXT) OWNER TO app;

GRANT EXECUTE ON PROCEDURE crear_categoria TO administrador_subastas;