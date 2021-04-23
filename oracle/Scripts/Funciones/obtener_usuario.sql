obtener_usuarios
CREATE OR REPLACE FUNCTION obtener_usuarios()
RETURNS TABLE (cedula int,alias varchar,correo varchar) AS
$$
BEGIN
    RETURN QUERY
		SELECT U.cedula,U.alias,U.correo FROM Usuarios U;
END;
