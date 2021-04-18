CREATE OR REPLACE PROCEDURE registrar_usuario(p_cedula IN INT, p_tipo_usuario IN VARCHAR2, p_alias IN VARCHAR2, p_contrasena IN VARCHAR2, p_nombre IN VARCHAR2, p_primer_apellido IN VARCHAR2, p_segundo_apellido IN VARCHAR2, p_direccion IN VARCHAR2, p_correo IN VARCHAR2, p_estado OUT INT)
AS
idTipo INT;
BEGIN

    SELECT TU.IdTipo INTO idTipo 
    FROM TiposUsuarios TU 
    WHERE Tu.Nombre = p_tipo_usuario;

    INSERT INTO Usuarios VALUES(p_cedula,idTipo,p_alias,p_contrasena,p_nombre,p_primer_apellido,p_segundo_apellido,p_direccion,p_correo);

    p_estado := 1;
END;

BEGIN
    registrar_usuario(901110498,'administrador','HakAus','1234qwer','Austin','Hakanson','Hidalgo','Guanacaste','austin@gmail.com',0);
END;

SELECT * FROM Usuarios