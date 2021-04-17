CREATE OR REPLACE PROCEDURE CREATE_PUSH(pId NUMBER,pIdSubasta NUMBER, pIdOfertante NUMBER,pMonto NUMBER,pFechaTiempo TIMESTAMP, pGanadora NUMBER,pMinimaSubida NUMBER) IS
    CURSOR monto_ofertas_subasta IS 
    SELECT Monto FROM Ofertas WHERE idSubasta = pIdSubasta ORDER BY Monto DESC;
    maxPrice NUMBER;
    BEGIN
        OPEN monto_ofertas_subasta;
        FETCH monto_ofertas_subasta INTO maxPrice;
        CLOSE monto_ofertas_subasta;
        IF pMonto > maxPrice + pMinimaSubida THEN
            INSERT INTO Ofertas VALUES(pId,pIdSubasta,pIdOfertante,pMonto,pFechaTiempo,pGanadora);
        END IF;
END;
