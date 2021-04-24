CREATE OR REPLACE PROCEDURE obtener_info_usuario(pCedula INT, ret OUT SYS_REFCURSOR)
AS
BEGIN
    OPEN ret FOR
    SELECT U.alias, TU.Nombre 
    FROM Usuarios U
    INNER JOIN TiposUsuarios TU ON TU.IdTipo = U.IdTipo
    WHERE U.Cedula = pCedula;
END;
