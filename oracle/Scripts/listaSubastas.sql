CREATE OR REPLACE PROCEDURE AUCT_LIST(pIdCategoria NUMBER,pIdSubcategoria NUMBER,pcr out sys_refcursor) AS
--Order by fecha y hora decreciente
BEGIN
    SELECT * INTO pcr FROM Subastas S LEFT JOIN Items I
    ON S.idItemSubastado = I.iditem AND I.idsubcategoria = pIdSubCategoria ORDER BY fechahoracierre DESC;
END;