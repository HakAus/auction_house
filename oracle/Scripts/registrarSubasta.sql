
CREATE OR REPLACE PROCEDURE AUCT_ITEM(pIdSubasta NUMBER,IdItemSubastado NUMBER,IdVendedor NUMBER,FechaHoraCierre TIMESTAMP,DetallesDeEntrega VARCHAR2,pIdItem NUMBER,pIdSubcategoria NUMBER,pPrecioBase NUMBER,pDescripcion VARCHAR2,pImagen BLOB) AS 
itemsEncontrados Items%ROWTYPE;
subastasEncontradas Subastas%ROWTYPE;
BEGIN
    SELECT * INTO itemsEncontrados FROM Items WHERE idItem = pIdItem;  
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        itemsEncontrados := NULL;
    IF SQL%NOTFOUND THEN
        BEGIN
            INSERT INTO Items VALUES(pIdItem,pIdSubcategoria,pPrecioBase,pDescripcion,pImagen);
            SELECT * INTO subastasEncontradas FROM Subastas WHERE idSubasta = pIdSubasta; 
            EXCEPTION
                WHEN NO_DATA_FOUND THEN
                    subastasEncontradas := NULL;
        END;
        IF SQL%NOTFOUND THEN
            INSERT INTO Subastas VALUES(pIdSubasta,IdItemSubastado,IdVendedor,FechaHoraCierre,DetallesDeEntrega);
        END IF;
    END IF;
END;