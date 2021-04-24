CREATE OR REPLACE PROCEDURE obtener_info_completa_usuario(p_cedula INT,ret OUT SYS_REFCURSOR)
AS
BEGIN
    OPEN ret FOR
        SELECT U.Alias, TU.Nombre, U.Contrasena, U.Nombre, U.PrimerApellido, U.SegundoApellido, U.Direccion, U.Correo
        FROM Usuarios U
        INNER JOIN TiposUsuarios TU ON TU.IdTipo = U.IdTipo
        WHERE U.Cedula = _cedula;
END;