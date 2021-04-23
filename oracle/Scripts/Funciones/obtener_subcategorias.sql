CREATE OR REPLACE PROCEDURE obtener_subcategorias(ret OUT SYS_REFCURSOR) 
AS
BEGIN
    OPEN ret FOR
	SELECT * FROM Subcategorias;
END;