CREATE OR REPLACE PROCEDURE obtener_subastas(ret OUT SYS_REFCURSOR) AS--Puedo crear una pseudoColumna para mostrar el nombre y la categoria, Considerar cuando no se pasan parametros. MOstrar toda la lista
BEGIN
    OPEN ret FOR
    SELECT I.idSubCategoria,S.idSubasta,I.descripcion,S.fechaHoraCierre,I.preciobase,I.imagen,S.detallesdeentrega FROM Subastas S
    INNER JOIN Items I ON I.iditem = S.iditemsubastado
    ORDER BY fechaHoraCierre DESC;
END;