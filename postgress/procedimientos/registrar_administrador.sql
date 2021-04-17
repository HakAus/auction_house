-- Funcion que retorna la cedula y alias si existe el usuario con las credenciales indicadas.
CREATE OR REPLACE PROCEDURE registrar_usuario
(
    IN _cedula INT,
    IN _nombre_tipo_usuario VARCHAR(50),
    IN _alias VARCHAR(20), 
    IN _contrasena VARCHAR(15), 
    IN _nombre VARCHAR(100),
    IN _primer_apellido VARCHAR(100),
    IN _segundo_apellido VARCHAR(100),
    IN _direccion VARCHAR(300),
    IN _correo VARCHAR(200),
    IN OUT _estado INT
) 
AS $$
DECLARE 
id_tipo_usuario INT := 0;
constraint_text TEXT;

BEGIN
    -- Se obtiene el id del tipo de usuario
    SELECT TU.IdTipo INTO id_tipo_usuario
    FROM TiposUsuarios TU
    WHERE TU.Nombre = _nombre_tipo_usuario;

    IF id_tipo_usuario <> 0 THEN
        INSERT INTO Usuarios
        VALUES (_cedula, id_tipo_usuario, _alias, _contrasena, _nombre, _primer_apellido, _segundo_apellido, _direccion, _correo);
        _estado := 1;   -- 1 significa exito
    ELSE
        _estado := -1;  -- -1 significa que el tipo de usuario no existe.
    END IF;

    EXCEPTION 
        WHEN unique_violation THEN  -- Cuando la cedula ya existe
            _estado := -2;
            RAISE NOTICE 'La cedula ingresada ya existe';
            RETURN;
        WHEN string_data_right_truncation THEN
            _estado := -3;
            RAISE NOTICE 'Verifique la longitud de los datos ingresados';
            RETURN;
        WHEN check_violation THEN
            GET STACKED DIAGNOSTICS 
            constraint_text = CONSTRAINT_NAME;
            IF constraint_text = 'c_formato_alias_valido'
            THEN
                _estado := -4;
                RAISE NOTICE 'Verifique el formato del alias ingresado';
            ELSIF constraint_text = 'c_formato_contrasena_valido' THEN
                _estado := -5;
                RAISE NOTICE 'Verifique el formato de la contraseña ingresada';
            END IF;
            RETURN;
END;
$$ 
LANGUAGE plpgsql
SECURITY DEFINER
    SET search_path = casa_subastas_schema, pg_temp;

ALTER PROCEDURE registrar_usuario(int,varchar,varchar,varchar,varchar,varchar,varchar,varchar,varchar,int) SET SCHEMA casa_subastas_schema;

ALTER PROCEDURE registrar_usuario(int,varchar,varchar,varchar,varchar,varchar,varchar,varchar,varchar,int) OWNER TO app;

GRANT EXECUTE ON PROCEDURE registrar_usuario TO administrador_subastas;