CREATE OR REPLACE PROCEDURE obtener_telefonos_usuario (p_cedula INT,ret OUT SYS_REFCURSOR)
AS
BEGIN
    OPEN ret FOR
        SELECT T.Telefono
        FROM Telefonos T
        WHERE T.IdUsuario = p_cedula;
END;