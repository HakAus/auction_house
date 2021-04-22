create or replace FUNCTION verificar_usuario
(
    p_alias IN VARCHAR2, 
     p_contrasena IN VARCHAR2 , 
     p_tipo_usuario  IN VARCHAR2 
) RETURN SYS_REFCURSOR
IS
cedula_validada INT := 0;
datos_salida SYS_REFCURSOR;
BEGIN
    SELECT Cedula INTO cedula_validada
    FROM Usuarios U
    INNER JOIN TiposUsuarios TU ON TU.Nombre = p_tipo_usuario
    WHERE U.Alias = p_alias AND U.Contrasena = p_contrasena AND TU.IdTipo = U.IdTipo;

    IF cedula_validada <> 0 THEN
        OPEN datos_salida FOR  
        SELECT cedula_validada, 1 FROM dual;
        -- _estado := 1;   -- 1 significa exito
    ELSE
         OPEN datos_salida FOR  
         SELECT 0 , -1 FROM dual;  -- -1 significa que el usuario no existe.
    END IF;
END; 