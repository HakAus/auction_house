CREATE OR REPLACE PROCEDURE agregar_telefono
(
    IN p_id_usuario INT,
    IN p_telefono INT
)
AS
$$
BEGIN

    INSERT INTO Telefonos (IdUsuario, Telefono)
    VALUES (p_id_usuario, p_telefono);
END;
$$ LANGUAGE plpgsql
 SECURITY DEFINER
    -- Set a secure search_path: trusted schema(s), then 'pg_temp', then pg_catalog to have user-defined names override built-in names
    SET search_path = casa_subastas_schema, pg_temp;

ALTER PROCEDURE agregar_telefono(INT, INT) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE agregar_telefono(INT, INT) OWNER TO app;

GRANT EXECUTE ON PROCEDURE agregar_telefono TO administrador_subastas;