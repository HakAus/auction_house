CREATE OR REPLACE FUNCTION PUSH_AUCT_LIST (pIdSubasta NUMBER) RETURN SYS_REFCURSOR AS 
    lista_pujas SYS_REFCURSOR;
BEGIN
    OPEN lista_pujas FOR
    SELECT * FROM Ofertas
    WHERE idsubasta = pIdSubasta
    ORDER BY fechatiempo DESC;
    RETURN lista_pujas;
END;

