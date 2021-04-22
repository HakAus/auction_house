-- Procedimiento que actualiza a un usuario. Retorna una variable _estado con 1 si es exitoso o un código de error si no.

CREATE OR REPLACE PROCEDURE actualizar_usuario
(
    IN p_cedula INT,
    IN p_nombre_tipo_usuario VARCHAR(50),
    IN p_alias VARCHAR(20), 
    IN p_contrasena VARCHAR(15), 
    IN p_nombre VARCHAR(100),
    IN p_primer_apellido VARCHAR(100),
    IN p_segundo_apellido VARCHAR(100),
    IN p_direccion VARCHAR(300),
    IN p_correo VARCHAR(200),
    IN OUT p_estado INT
) 
AS $$
DECLARE 
id_tipo_usuario INT := 0;
constraint_text TEXT;

BEGIN
    -- Se obtiene el id del tipo de usuario
    SELECT TU.IdTipo INTO id_tipo_usuario
    FROM TiposUsuarios TU
    WHERE TU.Nombre = p_nombre_tipo_usuario;

    IF id_tipo_usuario <> 0 THEN
        UPDATE Usuarios
        SET IdTipo = id_tipo_usuario, 
            Alias = p_alias, 
            Contrasena = p_contrasena, 
            Nombre = p_nombre, 
            PrimerApellido = p_primer_apellido, 
            SegundoApellido = p_segundo_apellido, 
            Direccion = p_direccion, 
            Correo = p_correo
        WHERE Cedula = p_cedula;
        p_estado := 1;   -- 1 significa exito
    ELSE
        p_estado := -1;  -- -1 significa que el tipo de usuario no existe.
    END IF;

    EXCEPTION 
        WHEN unique_violation THEN  -- Cuando la cedula ya existe
            p_estado := -2;
            RAISE NOTICE 'La cedula ingresada ya existe';
            RETURN;
        WHEN string_data_right_truncation THEN
            p_estado := -3;
            RAISE NOTICE 'Verifique la longitud de los datos ingresados';
            RETURN;
        WHEN check_violation THEN
            GET STACKED DIAGNOSTICS 
            constraint_text = CONSTRAINT_NAME;
            IF constraint_text = 'c_formato_alias_valido'
            THEN
                p_estado := -4;
                RAISE NOTICE 'Verifique el formato del alias ingresado';
            ELSIF constraint_text = 'c_formato_contrasena_valido' THEN
                p_estado := -5;
                RAISE NOTICE 'Verifique el formato de la contraseña ingresada';
            END IF;
            RETURN;
END;
$$ 
LANGUAGE plpgsql
SECURITY DEFINER
    SET search_path = casa_subastas_schema, pg_temp;


ALTER PROCEDURE actualizar_usuario(int,int,varchar,varchar,varchar,varchar,varchar,varchar,varchar,varchar,int) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE actualizar_usuario(int,int,varchar,varchar,varchar,varchar,varchar,varchar,varchar,varchar,int) OWNER TO app;

GRANT EXECUTE ON PROCEDURE actualizar_usuario TO administrador_subastas;