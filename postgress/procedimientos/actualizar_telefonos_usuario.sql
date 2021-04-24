-- Procedimiento que actualiza a un usuario. Retorna una variable _estado con 1 si es exitoso o un código de error si no.

CREATE OR REPLACE PROCEDURE borrar_telefonos_usuario (IN p_cedula INT) 
AS $$
BEGIN
    DELETE FROM Telefonos T
    WHERE T.IdUsuario = p_cedula;
END;
$$ 
LANGUAGE plpgsql
SECURITY DEFINER
    SET search_path = casa_subastas_schema, pg_temp;


ALTER PROCEDURE borrar_telefonos_usuario(int) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE borrar_telefonos_usuario(int) OWNER TO app;

GRANT EXECUTE ON PROCEDURE borrar_telefonos_usuario TO administrador_subastas;