create or replace PROCEDURE obtener_subastas(ret OUT SYS_REFCURSOR) AS--Puedo crear una pseudoColumna para mostrar el nombre y la categoria, Considerar cuando no se pasan parametros. MOstrar toda la lista
BEGIN
    OPEN ret FOR
    SELECT I.idSubCategoria,S.idSubasta,I.descripcion,S.fechaHoraCierre,I.preciobase,I.imagen,S.detallesdeentrega,u.alias  FROM Subastas S
    INNER JOIN Items I ON I.iditem = S.iditemsubastado
    INNER JOIN Usuarios U ON S.idVendedor = U.cedula
    ORDER BY fechaHoraCierre DESC;
END;