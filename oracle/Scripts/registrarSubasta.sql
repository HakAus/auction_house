
CREATE OR REPLACE PROCEDURE AUCT_ITEM(IdSubasta NUMBER,IdItemSubastado NUMBER,IdVendedor NUMBER,FechaHoraCierre TIMESTAMP,DetallesDeEntrega VARCHAR2,pIdItem NUMBER,pIdSubcategoria NUMBER,pPrecioBase NUMBER,pDescripcion VARCHAR2,pImagen BLOB) AS 
CURSOR search_item IS
SELECT idItem FROM Items WHERE idItem = pIdItem;
CURSOR search_subasta IS
SELECT idItem FROM Items WHERE idItem = pIdItem;
BEGIN
    OPEN search_Item;    
    IF search_Item%NOTFOUND THEN
        INSERT INTO Items VALUES(pIdItem,pIdSubcategoria,pPrecioBase,pDescripcion,pImagen);
        OPEN search_subasta;
        IF search_subasta%NOTFOUND THEN
            INSERT INTO Subastas VALUES(IdSubasta,IdItemSubastado,IdVendedor,FechaHoraCierre,DetallesDeEntrega);
        END IF;
    END IF;
END;