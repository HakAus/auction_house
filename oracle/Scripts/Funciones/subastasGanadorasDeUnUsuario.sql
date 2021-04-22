CREATE OR REPLACE FUNCTION WINNER_AUCT_USER_LIST(pIdComprador NUMBER) RETURN SYS_REFCURSOR AS
    lista_subastas SYS_REFCURSOR;
BEGIN
    OPEN lista_subastas FOR
    SELECT * FROM Subastas S,Usuarios U,Ofertas O
    WHERE O.idOfertante = pIdComprador AND O.idSubasta = S.idSubasta
    ORDER BY fechaHoraCierre DESC;
    RETURN lista_subastas;
END;