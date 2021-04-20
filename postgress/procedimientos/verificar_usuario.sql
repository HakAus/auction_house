-- Procedimiento que valida la existencia de un usuario en el sistema. Retorna una variable _estado con 1 si es existoso, si no retorna un código de error.

CREATE OR REPLACE FUNCTION verificar_usuario
(
    IN _alias VARCHAR(20), 
    IN _contrasena VARCHAR(15), 
    IN _tipo_usuario VARCHAR(50),
    OUT _cedula INT,
    OUT _estado INT
) RETURNS SETOF record
AS $$
DECLARE 
cedula_validada INT := 0;
constraint_text TEXT;

BEGIN

    SELECT Cedula INTO cedula_validada
    FROM Usuarios U
    INNER JOIN TiposUsuarios TU ON TU.Nombre = _tipo_usuario
    WHERE U.Alias = _alias AND U.Contrasena = _contrasena AND TU.IdTipo = U.IdTipo;
    
    IF cedula_validada <> 0 THEN
        RETURN QUERY SELECT cedula_validada, 1;
        -- _estado := 1;   -- 1 significa exito
    ELSE
        RETURN QUERY SELECT 0, -1;  -- -1 significa que el usuario no existe.
    END IF;
END;
$$ 
LANGUAGE plpgsql
SECURITY DEFINER
    SET search_path = casa_subastas_schema, pg_temp;

ALTER FUNCTION verificar_usuario(varchar,varchar,varchar) SET SCHEMA casa_subastas_schema;

ALTER FUNCTION verificar_usuario(varchar,varchar,varchar) OWNER TO app;

GRANT EXECUTE ON FUNCTION verificar_usuario TO administrador_subastas;

GRANT EXECUTE ON FUNCTION verificar_usuario TO participante_subastas;