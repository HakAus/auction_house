
CREATE OR REPLACE PROCEDURE registrar_subasta(IdItemSubastado NUMBER,IdVendedor NUMBER, FechaHoraCierre TIMESTAMP,DetallesDeEntrega) AS 
itemsEncontrados Items%ROWTYPE;
usuariosEncontrados Items%ROWTYPE;
BEGIN
    SELECT * INTO itemsEncontrados FROM Items WHERE IdItem = IdItemSubastado;  
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        RAISE EXCEPTION 'El item ingresado es inválido'
    
    SELECT * INTO usuariosEncontrados FROM Usuarios WHERE IdItem = IdVendedor;  
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        RAISE EXCEPTION 'El vendedor ingresado es inválido'

    INSERT INTO Subastas VALUES(IdItemSubastado,IdVendedor,FechaHoraCierre,DetallesDeEntrega);
END;