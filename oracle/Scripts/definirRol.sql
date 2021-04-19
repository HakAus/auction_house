CREATE OR REPLACE PROCEDURE definir_rol(tipo_usuario VARCHAR2)
AS
BEGIN
    IF tipos_usuario = 'administrador' THEN
        SET ROLE administrador_subastas;
    ELSE IF tipo_usuario = 'participante' THEN
        SET ROLE participante_subastas;
    END IF;
END;