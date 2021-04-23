CREATE OR REPLACE PROCEDURE obtener_ventas_por_comprador ( p_id_comprador NUMBER,ret OUT SYS_REFCURSOR)
AS
BEGIN
    OPEN ret FOR
    SELECT S.idSubasta, S.FechaHoraCierre, I.Descripcion
    FROM Ventas V
    INNER JOIN Usuario U ON U.Cedula = p_id_comprador
    INNER JOIN Subasta S  ON S.IdSubasta = V.IdSubasta
    INNER JOIN Item I ON I.IdItem = S.IdItemSubastado
    INNER JOIN Oferta O ON O.IdSubasta = S.IdSubasta
    WHERE O.Ganadora = 1 AND O.IdSubasta = S.IdSubasta;
END;