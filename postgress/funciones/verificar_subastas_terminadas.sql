CREATE OR REPLACE PROCEDURE verificar_subastas_terminadas()
AS
$$
BEGIN
    INSERT INTO Ventas (IdSubasta, IdComprador)
        SELECT S.IdSubasta,  PM.IdOfertante
        FROM Subastas S
        INNER JOIN PujasMaximas PM ON PM.IdSubasta = S.IdSubasta
        WHERE S.FechaHoraCierre < NOW();
END;
$$
LANGUAGE plpgsql;