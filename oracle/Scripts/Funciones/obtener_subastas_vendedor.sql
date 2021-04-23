create or replace PROCEDURE obtener_subastas_vendedor (p_id_vendedor NUMBER,ret OUT SYS_REFCURSOR) AS
BEGIN
    OPEN ret FOR
    SELECT S.idSubasta, S.FechaHoraCierre, I.Descripcion
    FROM Subastas S
    INNER JOIN Usuarios U ON U.Cedula = S.IdVendedor
    INNER JOIN Items I ON I.IdItem = S.IdItemSubastado
    WHERE S.IdVendedor = p_id_vendedor;
END;