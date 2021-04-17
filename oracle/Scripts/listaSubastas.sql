CREATE OR REPLACE FUNCTION AUCT_LIST(pIdCategoria NUMBER,pIdSubcategoria NUMBER) RETURN SYS_REFCURSOR AS--Puedo crear una pseudoColumna para mostrar el nombre y la categoria, Considerar cuando no se pasan parametros. MOstrar toda la lista
    lista_subastas SYS_REFCURSOR;
BEGIN
    OPEN lista_subastas FOR
    SELECT I.idSubCategoria,S.idSubasta,I.descripcion,S.idVendedor,S.fechaHoraCierre,S.detallesDeEntrega FROM Subastas S, Items I
    WHERE S.idItemSubastado = I.idItem AND I.idSubcategoria = pIdSubcategoria
    ORDER BY fechaHoraCierre DESC;
    RETURN lista_subastas;
END;