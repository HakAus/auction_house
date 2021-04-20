CREATE OR REPLACE FUNCTION obtener_info_usuario(pCedula INT)
RETURN SYS_REFCURSOR AS
info_usuario SYS_REFCURSOR;
BEGIN
    OPEN info_usuario FOR
    SELECT U.nickNake, TU.Nombre
    FROM Usuarios I
    INNER JOIN Tipos TU ON TU.IdTipo = U.IdTipo
    WHERE U.Cedula = pCedula;
    RETURN info_usuarios;
END;
