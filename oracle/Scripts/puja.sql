CREATE OR REPLACE PROCEDURE CREATE_PUSH(pId NUMBER,pIdSubasta NUMBER, pIdOfertante NUMBER,pMonto NUMBER,pFechaTiempo TIMESTAMP, pGanadora NUMBER,pMinimaSubida NUMBER) AS

BEGIN
    DECLARE
         maxPrice NUMBER;
         CURSOR c1 IS 
         SELECT MAX(MONTO) INTO maxPrice FROM Ofertas WHERE idSubasta = pIdSubasta;
        
    BEGIN
        OPEN c1;
        IF pMonto > maxPrice + pMinimaSubida THEN
            INSERT INTO Ofertas VALUES(pId,pIdSubasta,pIdOfertante,pMonto,pFechaTiempo,pGanadora);
        END IF;

    END;
END;
