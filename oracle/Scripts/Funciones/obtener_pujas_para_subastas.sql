create or replace PROCEDURE obtener_pujas_para_subastas (pIdSubasta NUMBER,ret OUT SYS_REFCURSOR) IS
BEGIN
    OPEN ret FOR
    SELECT * FROM Ofertas
    WHERE idsubasta = pIdSubasta
    ORDER BY fechatiempo DESC;
END;