CREATE OR REPLACE FUNCTION AUCT_USER_LIST(pIdVendedor NUMBER)RETURN SYS_REFCURSOR AS
    lista_subastas SYS_REFCURSOR;
BEGIN
    OPEN lista_subastas FOR
    SELECT * FROM Subastas
    WHERE idVendedor = pIdVendedor
    ORDER BY fechaHoraCierre DESC;
    RETURN lista_subastas;
END;